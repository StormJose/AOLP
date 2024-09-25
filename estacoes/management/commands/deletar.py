from django.core.management.base import BaseCommand
from estacoes.models import *

class Command(BaseCommand):
    
    help = 'deletar informações do banco (comando feito para testes por Diwter150 da equipe de Back-End)'
    
    def handle(self, *args, **kwargs):
        sapo_programador = Curso.objects.get(id=2)
        grog = Estacao.objects.get(id=2)
        
        sapo_programador.delete()
        grog.delete()
        
        print('lixos eliminados da face da terra com sucesso')