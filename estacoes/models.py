from typing import Iterable
from django.db import models
import re

class Estacao(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome

class Curso(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    estacao = models.ManyToManyField(Estacao, related_name='cursos')

    def __str__(self):
        return self.nome
    

    
class Aula(models.Model):
    titulo = models.CharField(max_length=100)
    url = models.URLField()
    url_id = models.CharField(max_length=11, blank=True, null=True)
    descricao = models.TextField(blank=True, null=True)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='aulas')

    def __str__(self):
        return self.titulo
    
    def save(self, *args, **kwargs):
        # Updated regex pattern to handle additional query parameters
        regex = (
        r'(:https?://)?(:www\.)?'
        '(youtube|youtu|youtube-nocookie)\.(com|be)/'
        '(watch\?v=|embed/|v/|/+\?v=)?([^&=%\?]{11})')
        
        url_match = re.search(regex, self.url)
        if url_match:
            self.url_id = url_match.group(6)
        
        return super().save(*args, **kwargs)