from django.core.management.base import BaseCommand
from usuarios.models import Instrutor

class Command(BaseCommand):
    
    help = 'Serve pra deletar um instrutor do banco (comando feito para testes por Diwter150 da equipe de Back-End)'
    
    def handle(self, *args, **kwargs):
        intrutor = Instrutor.objects.get(id=3)
        intrutor.delete()
        print('Instrutor deletado')