from django.test import TestCase
from django.urls import reverse
from .models import Curso, Estacao, Aula

# Teste para a view 'estacoes'
class EstacoesViewTests(TestCase):
    def test_estacoes_view(self):
        response = self.client.get(reverse('estacoes'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'estacoes.html')
        self.assertIn('pesquisas_data', response.context)
        self.assertIn('vars_data', response.context)

# Teste para a view 'cursos'
class CursosViewTests(TestCase):
    def test_cursos_view(self):
        response = self.client.get(reverse('cursos'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'cursos.html')
        self.assertIn('estacoes_tags', response.context)
        self.assertIn('estacoes', response.context)
        self.assertIn('current_id', response.context)

# Teste para a view 'curso'
class CursoViewTests(TestCase):
    def test_curso_view(self):
        estacao = Estacao.objects.create(nome='Estacao Teste')
        response = self.client.get(reverse('curso', args=[estacao.id]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'cursos.html')
        self.assertIn('estacoes_tags', response.context)
        self.assertIn('estacoes', response.context)
        self.assertIn('current_id', response.context)

# Teste para a view 'aulas'
class AulasViewTests(TestCase):
    def test_aulas_view(self):
        curso = Curso.objects.create(nome='Curso Teste')
        response = self.client.get(reverse('aulas', args=[curso.id]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'aulas_list.html')
        self.assertIn('curso', response.context)

# Teste para a view 'aula'
class AulaViewTests(TestCase):
    def test_aula_view(self):
        aula = Aula.objects.create(nome='Aula Teste')
        response = self.client.get(reverse('aula', args=[aula.id]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'aula.html')
        self.assertIn('aula', response.context)
