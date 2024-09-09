from django.test import TestCase
from django.urls import reverse
from estacoes.models import Curso, Estacao, Aula

# Teste para a view 'estacoes'
# class EstacoesViewTests(TestCase):
#     def test_estacoes_view(self):
#         response = self.client.get(reverse('estacoes'))
#         self.assertEqual(response.status_code, 200)
#         self.assertTemplateUsed(response, 'estacoes.html')
#         self.assertIn('pesquisas_data', response.context)
#         self.assertIn('vars_data', response.context)

# Teste para a view 'cursos'
class CursosViewTests(TestCase):
    def test_cursos_view(self):
        response = self.client.get(reverse('estacoes:cursos'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'cursos.html')
        self.assertIn('estacoes_tags', response.context)
        self.assertIn('estacoes', response.context)

# Teste para a view 'curso'
class CursoViewTests(TestCase):
    def test_curso_view(self):
        estacao = Estacao.objects.create(nome='Estacao Teste')
        response = self.client.get(reverse('estacoes:curso', args=[estacao.nome]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'cursos.html')
        self.assertIn('estacoes_tags', response.context)
        self.assertIn('estacoes', response.context)

    # Estacao não existe
    def test_curso_view_curso_does_not_exist(self):
        response = self.client.get(reverse('estacoes:aulas', args=['invalid-nome']))
        self.assertEqual(response.status_code, 404)


# Setup base para testes de 'aulas' e 'aulas'
class BaseAulasSetupTest(TestCase):
    def setUp(self):
        # Create Estacao and Curso instances
        self.estacao = Estacao.objects.create(nome='Estacao 1')

        # Create Curso and associate it with Estacao
        self.curso = Curso.objects.create(nome='Curso Teste', descricao='Descrição do Curso Teste')
        self.curso.estacao.add(self.estacao)

        # Create Aula instances
        self.aula1 = Aula.objects.create(curso=self.curso, titulo='Aula 1', url='https://www.youtube.com/embed/xyz123')
        self.aula2 = Aula.objects.create(curso=self.curso, titulo='Aula 2')


# Teste para a view 'aulas'
class AulasViewTests(BaseAulasSetupTest):

    def test_aulas_view(self):
        response = self.client.get(reverse('estacoes:aulas', args=[self.curso.nome]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'aulas_list.html')
        self.assertIn('curso', response.context)
        self.assertIn('aulas', response.context)
        self.assertIn('active_aula', response.context)
        self.assertEqual(response.context['active_aula'], self.aula1)

        # Curso não existente (Edge-Case)
    def test_aulas_view_curso_does_not_exist(self):
        response = self.client.get(reverse('estacoes:aulas', args=['invalid-nome'])) 
        self.assertEqual(response.status_code, 404)
       

# Teste para a view 'aula'
class AulaViewTests(BaseAulasSetupTest):
    def test_aula_view(self):
        response = self.client.get(reverse('estacoes:aula', args=[self.curso.nome, self.aula1.titulo]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'aulas_list.html')
        self.assertIn('curso', response.context)
        self.assertIn('active_aula', response.context)
        self.assertEqual(response.context['active_aula'], self.aula1)

    # Curso e aula não existem
    def test_aula_view_curso_does_not_exist(self):
        response = self.client.get(reverse('estacoes:aula', args=['invalid-nome', 'aula-titulo']))
        self.assertEqual(response.status_code, 404)

    # Curso existe mas aula não encontrada
    def test_aula_view_aula_does_not_exist(self):
        response = self.client.get(reverse('estacoes:aula', args=[self.curso.nome, 'nonexistent-aula']))
        self.assertEqual(response.status_code, 404)



class QuestaoViewTests(TestCase):
    # TO DO 
    None
