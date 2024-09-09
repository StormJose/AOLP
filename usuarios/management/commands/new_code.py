from django.core.management.base import BaseCommand
from usuarios.models import CodigoInstrutor

class Command(BaseCommand):
    
    help = 'É pra adicionar um novo codigo de instrutor no banco (comando feito para testes por Diwter150 da equipe de Back-End)'
    
    def handle(self, *args, **kwargs):
        codigo = CodigoInstrutor()
        codigo.codigo = '2469'
        
        codigo.save()
        print(f'Cogido {codigo.codigo} criado com sucesso ;3')