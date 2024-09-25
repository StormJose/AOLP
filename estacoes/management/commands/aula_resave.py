from django.core.management.base import BaseCommand
from estacoes.models import Aula

class Command(BaseCommand):
    
    help = 'Recarregar a entrada em aula testando o comando save() do modelo (comando feito para testes por Diwter150 da equipe de Back-End)'
    
    def handle(self, *args, **kwargs):
        resave = Aula.objects.get(id=2)
        resave.save()
        
        print('comando save executado com sucesso')