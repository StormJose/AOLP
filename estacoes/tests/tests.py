from django.urls import reverse, resolve
from django.test import SimpleTestCase
from . import crud_views as views

class TestUrls(SimpleTestCase):

    def test_url_is_resolved(self, url_name, view_func, *args):
        url = reverse(url_name, args=args)
        self.assertEquals(resolve(url).func, view_func)

    def test_est_curs_url_is_resolved(self):
        self.test_url_is_resolved('est_curs', views.est_curs)

    def test_estacao_list_url_is_resolved(self):
        self.test_url_is_resolved('estacao_list', views.estacao_list)

    def test_estacao_detail_url_is_resolved(self):
        self.test_url_is_resolved('estacao_detail', views.estacao_detail, 1)

    def test_estacao_create_url_is_resolved(self):
        self.test_url_is_resolved('estacao_create', views.estacao_create)

    def test_estacao_edit_url_is_resolved(self):
        self.test_url_is_resolved('estacao_edit', views.estacao_edit, 1)

    def test_estacao_delete_url_is_resolved(self):
        self.test_url_is_resolved('estacao_delete', views.estacao_delete, 1)

    def test_curso_list_url_is_resolved(self):
        self.test_url_is_resolved('curso_list', views.curso_list)

    def test_curso_detail_url_is_resolved(self):
        self.test_url_is_resolved('curso_detail', views.curso_detail, 1)

    def test_curso_create_url_is_resolved(self):
        self.test_url_is_resolved('curso_create', views.curso_create)

    def test_curso_edit_url_is_resolved(self):
        self.test_url_is_resolved('curso_edit', views.curso_edit, 1)

    def test_curso_delete_url_is_resolved(self):
        self.test_url_is_resolved('curso_delete', views.curso_delete, 1)

    def test_aula_create_url_is_resolved(self):
        self.test_url_is_resolved('aula_create', views.aula_create)
