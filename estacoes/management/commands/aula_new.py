from django.core.management.base import BaseCommand
from estacoes.models import Aula, Curso


class Command(BaseCommand):
    
    help = 'Cria manualmente uma nova entrada na tabela de aulas das estações (comando criado para fins de teste de funcionalidade por Diwter150 do Back-End)'
    
    def handle(self, *args, **kwargs):
        nova_aula = Aula()
        nova_aula.titulo = 'Rick e Morty'
        nova_aula.video = 'https://youtu.be/n_qR6A_h6p0?si=RmD_L6A68ctMJE5V'
        nova_aula.descricao = 'O Gustavo Porteira Tauleane me mandou colocar essa aula'
        nova_aula.curso = Curso.objects.get(id=1)
        nova_aula.save()

        print("Rick Rolled com sucesso")
