from django import forms 
from .models import Estacao, Curso, Aula
        
class EstacaoForm(forms.ModelForm):
    class Meta:
        model = Estacao
        fields = ['nome', 'descricao']
        
class CursoForm(forms.ModelForm):
    class Meta:
        model = Curso
        fields = ['nome', 'descricao', 'estacao']
        
class AulaForm(forms.ModelForm):
    class Meta:
        model = Aula
        fields = ['titulo', 'url', 'descricao', 'curso']