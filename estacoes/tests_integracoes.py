from django.test import TestCase, Client
from django.urls import reverse
from .models import Estacao, Curso, Aula
from .tests import URLTests

class TestViewsIntegration(TestCase):
    # Namespace do app 'estacoes'
    namespace = 'estacoes'  

    # Este método também está presente em tests.py. Se puder,
    # implemente o pilar de herança pra herdar o método que vem de lá
    # Gararantir que os caminhos sejam testados com o namespace adequado
    def reverse_with_namespace(self, url_name, *args):
        return reverse(f'{self.namespace}:{url_name}', args=args)


    def setUp(self):
        self.client = Client()
        self.estacoes_url = self.reverse_with_namespace('estacao_list')
        self.cursos_url = self.reverse_with_namespace('curso_list')
        self.aulas_url = self.reverse_with_namespace('aulas_list')
        self.aula_create_url = self.reverse_with_namespace('aula_create')

        self.curso = Curso.objects.create(id='5', nome='Curso Teste', descricao='Descrição do Curso Teste')

    def tearDown(self):
        Estacao.objects.all().delete()
        Curso.objects.all().delete()
        Aula.objects.all().delete()

    def test_estacao_list_GET(self):
        response = self.client.get(self.estacoes_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'api/estacao_list.html')
        self.assertContains(response, 'Estações')

    def test_curso_list_GET(self):
        response = self.client.get(self.cursos_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'api/curso_list.html')
        self.assertContains(response, 'Cursos')


    def test_aulas_list_GET(self):
        response = self.client.get(self.aulas_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'api/aula_list.html')
        self.assertContains(response, 'Aulas')

    def test_aula_create_POST_valid(self):
        response = self.client.post(self.aula_create_url, {
            'titulo': 'Aula Teste',
            'video': 'https://www.youtube.com/embed/3MwMII8n1qM?si=DmFCWDI5WaT2E1f-',
            'descricao': 'Descrição Teste',
            'curso': 5,
        })  
        self.assertEquals(response.status_code, 302)
        self.assertRedirects(response, reverse('estacoes:aulas_list'))

    # def test_aula_create_POST_invalid(self):
    #     response = self.client.post(self.aula_create_url, {
    #         'nome': '',
    #         'descricao': 'Descrição Teste'
    #     })
    #     self.assertEquals(response.status_code, 400)
    #     self.assertTemplateUsed(response, 'aula_form.html')