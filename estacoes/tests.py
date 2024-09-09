from django.test import TestCase

from django.urls import reverse, resolve
from . import crud_views, views




class URLTests(TestCase):
    namespace = 'estacoes'  

    # Gararantir que os caminhos sejam testados com o namespace adequado
    def reverse_with_namespace(self, url_name, *args):
        return reverse(f'{self.namespace}:{url_name}', args=args)


    # Achei essa solução mais agradável mas não funcionou. Fica a seu critério.
    # def test_url_is_resolved(self, url_name, view_func, *args):
    #     print(f'{url_name}, {view_func}, {args}')
    #     url = self.reverse_with_namespace(url_name, *args)
    #     self.assertEqual(resolve(url).func, view_func)


    # Estacao
    def test_estacao_create_url(self):
        url = self.reverse_with_namespace('estacao_create')
        self.assertEqual(resolve(url).func, crud_views.estacao_create)

    def test_estacao_edit_url(self):
        url = self.reverse_with_namespace('estacao_edit', 1)
        self.assertEqual(resolve(url).func, crud_views.estacao_edit)

    def test_estacao_delete_url(self):
        url = self.reverse_with_namespace('estacao_delete', 1)
        self.assertEqual(resolve(url).func, crud_views.estacao_delete)


    # Curso
    def test_cursos_url(self):
        url = self.reverse_with_namespace('cursos')
        self.assertEqual(resolve(url).func, views.cursos)

    def test_curso_url(self):
        url = self.reverse_with_namespace('curso', 'Estacao 1')
        self.assertEqual(resolve(url).func, views.curso)

    def test_curso_create_url(self):
        url = self.reverse_with_namespace('curso_create')
        self.assertEqual(resolve(url).func, crud_views.curso_create)

    def test_curso_detail_url(self):
        url = self.reverse_with_namespace('curso_detail', 'Curso Teste')
        self.assertEqual(resolve(url).func, crud_views.curso_detail)

    def test_curso_edit_url(self):
        url = self.reverse_with_namespace('curso_edit', 1)
        self.assertEqual(resolve(url).func, crud_views.curso_edit)

    def test_curso_delete_url(self):
        url = self.reverse_with_namespace('curso_delete', 1)
        self.assertEqual(resolve(url).func, crud_views.curso_delete)

    # Aula
    def test_aulas_url(self):
        url = self.reverse_with_namespace('aulas', 'Curso Teste')
        self.assertEqual(resolve(url).func, views.aulas)

    def test_aula_url(self):
        url = self.reverse_with_namespace('aula', 'Curso Teste', 'Aula 1')
        self.assertEqual(resolve(url).func, views.aula)

    def test_aula_create_url(self):
        url = self.reverse_with_namespace('aula_create')
        self.assertEqual(resolve(url).func, crud_views.aula_create)

    def test_aula_delete_url(self):
        url = self.reverse_with_namespace('aula_delete', 1)
        self.assertEqual(resolve(url).func, crud_views.aula_delete)


    # TO DO
    # def test_questao_url(self):
    #     url = self.reverse_with_namespace('questao', args=[1])
    #     self.assertEqual(resolve(url).func, views.questao)
  