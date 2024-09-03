# Teste Unitario | Rodar no terminal:  python manage.py test


from django.test import TestCase
from django.urls import reverse

class ExampleAPIViewTests(TestCase):
    def test_example_api_view(self):
        response = self.client.get(reverse('example'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'conteudo_esperado')

class UsuariosViewTests(TestCase):
    def test_usuarios_lista(self):
        response = self.client.get(reverse('usuarios_lista'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'algum_conteudo_esperado')

    def test_usuario_detail(self):
        response = self.client.get(reverse('usuario_detail', args=['1']))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'detalhes_do_usuario')

class EstacaoViewTests(TestCase):
    def test_estacao_list(self):
        response = self.client.get(reverse('estacao_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'lista_de_estacoes')

    def test_estacao_detail(self):
        response = self.client.get(reverse('estacao_detail', args=['nome_da_estacao']))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'detalhes_da_estacao')

class CursoViewTests(TestCase):
    def test_curso_list(self):
        response = self.client.get(reverse('curso_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'lista_de_cursos')

    def test_curso_detail(self):
        response = self.client.get(reverse('curso_detail', args=['nome_do_curso']))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'detalhes_do_curso')

class AulaViewTests(TestCase):
    def test_aula_list(self):
        response = self.client.get(reverse('aula_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'lista_de_aulas')

    def test_aula_detail(self):
        response = self.client.get(reverse('aula_detail', args=['1']))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'detalhes_da_aula')
