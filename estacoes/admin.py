from django.contrib import admin
from .models import Curso, Estacao

class CursoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'descricao']
    search_fields = ['nome']
    
class EstacaoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'descricao']
    search_fields = ['nome']

admin.site.register(Curso, CursoAdmin)
admin.site.register(Estacao, EstacaoAdmin)

