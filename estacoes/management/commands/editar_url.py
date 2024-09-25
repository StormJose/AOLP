from django.core.management.base import BaseCommand
from estacoes.models import *

class Command(BaseCommand):
    
    help = 'editar a url da aula (comando feito para testes por Diwter150 da equipe de Back-End)'
    
    def handle(self, *args, **kwargs):
        aula = Aula.objects.get(id=2)
        aula.url = 'https://www.youtube.com/watch?v=of4aFbUKjbk'
        aula.save()