# Teste integração | teste no terminal: python itests_integracoes.py


import requests
import unittest

class IntegrationTests(unittest.TestCase):
    base_url = 'http://127.0.0.1:8000/'

    def test_get_example(self):
        response = requests.get(f'{self.base_url}/example/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('conteudo_esperado', response.text)

    def test_get_usuarios(self):
        response = requests.get(f'{self.base_url}/usuarios/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('algum_conteudo_esperado', response.text)

    def test_get_usuario_detail(self):
        response = requests.get(f'{self.base_url}/usuarios/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('detalhes_do_usuario', response.text)

    def test_get_estacoes(self):
        response = requests.get(f'{self.base_url}/estacoes/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('lista_de_estacoes', response.text)

    def test_get_estacao_detail(self):
        response = requests.get(f'{self.base_url}/estacoes/nome_da_estacao/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('detalhes_da_estacao', response.text)

    def test_get_cursos(self):
        response = requests.get(f'{self.base_url}/cursos/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('lista_de_cursos', response.text)

    def test_get_curso_detail(self):
        response = requests.get(f'{self.base_url}/cursos/nome_do_curso/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('detalhes_do_curso', response.text)

    def test_get_aulas(self):
        response = requests.get(f'{self.base_url}/aulas/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('lista_de_aulas', response.text)

    def test_get_aula_detail(self):
        response = requests.get(f'{self.base_url}/aulas/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('detalhes_da_aula', response.text)

if __name__ == '__main__':
    unittest.main()
