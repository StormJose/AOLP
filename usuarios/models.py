from django.db import models
    
    
class FotoPerfil(models.Model):
    id = models.AutoField(primary_key=True)
    imagem = models.ImageField(upload_to='perfil')
    
    def __str__(self):
        return self.id
    
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nome = models.TextField(max_length=255)
    email = models.EmailField(max_length=254,null=True,blank=True)
    foto_perfil = models.ForeignKey(FotoPerfil, default=1, on_delete=models.SET_DEFAULT)
    senha = models.CharField(max_length=50, null=True,blank=True)

    def __str__(self):
        return self.nome

class Instrutor(models.Model):
    nome = models.TextField(max_length=255)
    email = models.EmailField(max_length=254,null=True,blank=True)
    foto_perfil = models.ForeignKey(FotoPerfil, default=1, on_delete=models.SET_DEFAULT)
    senha = models.CharField(max_length=50, null=True,blank=True)

    def __str__(self):
        return self.nome
    
class CodigoInstrutor(models.Model):
    codigo = models.TextField(max_length=4)
    instrutor = models.OneToOneField(Instrutor, verbose_name="instrutor", on_delete=models.CASCADE,null=True,blank=True , default=None)
    