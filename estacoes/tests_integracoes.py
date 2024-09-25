from django.test import TestCase, Client
from django.urls import reverse
from .models import Estacao, Curso, Aula

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.estacao_list_url = reverse('estacao_list')
        self.curso_list_url = reverse('curso_list')
        self.aula_create_url = reverse('aula_create')

    def tearDown(self):
        Estacao.objects.all().delete()
        Curso.objects.all().delete()
        Aula.objects.all().delete()

    def test_estacao_list_GET(self):
        response = self.client.get(self.estacao_list_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'app/estacao_list.html')
        self.assertContains(response, 'Estação')

    def test_curso_list_GET(self):
        response = self.client.get(self.curso_list_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'app/curso_list.html')
        self.assertContains(response, 'Curso')

    def test_aula_create_POST_valid(self):
        response = self.client.post(self.aula_create_url, {
            'nome': 'Aula Teste',
            'descricao': 'Descrição Teste'
        })
        self.assertEquals(response.status_code, 302)
        self.assertRedirects(response, reverse('aula_list'))

    def test_aula_create_POST_invalid(self):
        response = self.client.post(self.aula_create_url, {
            'nome': '',
            'descricao': 'Descrição Teste'
        })
        self.assertEquals(response.status_code, 400)
        self.assertTemplateUsed(response, 'app/aula_form.html')
