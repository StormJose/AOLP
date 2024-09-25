from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .models import FotoPerfil, Usuario, Instrutor, CodigoInstrutor

from .forms import FotoPerfilForm
from utils.uteis import vars, formSenha


from django.shortcuts import HttpResponse
from django.conf import settings
import os


def cadastro(request):
    if request.method == 'POST':
        opção = request.POST.get('perfil')
         
        if opção == 'estudante':
            email = request.POST.get('email')
            if Usuario.objects.filter(email=email).first() is not None:
                request.session['error_msg'] = 'E-mail ja registrado'
                
                return redirect(reverse('cadastro'))
            else:
                novo_usuario = Usuario()
                novo_usuario.nome = request.POST.get('nome')
                novo_usuario.email = request.POST.get('email')
                novo_usuario.senha = make_password(request.POST.get('senha'))
                novo_usuario.save()
                
                request.session['user_id'] = novo_usuario.id_usuario
                

                return redirect(reverse('home'))
        
        else:
            senha = formSenha(request)
            email = request.POST.get('email')
            if Instrutor.objects.filter(email=email).first() is not None:
                request.session['error_msg'] = 'Esse e-mail ja tem oh paspalho'
                
                return redirect(reverse('cadastro'))
            else:
                cod = CodigoInstrutor.objects.filter(codigo=senha).first()
                if cod is not None:
                    if cod.instrutor is None:
                        novo_instrutor = Instrutor()
                        novo_instrutor.nome = request.POST.get('nome')
                        novo_instrutor.email = request.POST.get('email')
                        novo_instrutor.senha = make_password(request.POST.get('senha'))
                        novo_instrutor.save()
                        
                        cod.instrutor = novo_instrutor
                        cod.save()
                        request.session['user_id'] = novo_instrutor.id
                    else: 
                        request.session['error_msg'] = 'Aeh vagabundo ta tentando entrar como adm??'
                        
                        return redirect(reverse('cadastro'))
                else: 
                    request.session['error_msg'] = 'Pfff digitou errado idiota'
                    
                    return redirect(reverse('cadastro'))
            return redirect(reverse('home'))
    else:
        return render(request,'cadastro.html', vars(request))
 
def perfil_usuario(request):
    if request.method == 'POST':
        foto = FotoPerfil.objects.get(id=request.POST.get('drone')) 
        user = Usuario.objects.get(id_usuario=request.session.get('user_id'))
        
        user.foto_perfil = foto
        user.save()
        
        return redirect(reverse('home'))
    else:
        return render(request, 'perfil.html', vars(request))

def lista_usuarios(request):
    usuarios = {
        'usuarios': Usuario.objects.all()
    }
    usuarios['imagens'] = FotoPerfil.objects.all()
    return render(request, 'usuarios.html',usuarios)
    
def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        user = Usuario.objects.filter(email=email).first()
        if user is None:
            request.session['error_msg'] = 'Email não existe'
            request.session['email'] = email
            return redirect(reverse('login'))
        
        request_senha = request.POST.get('senha')
        user_senha = user.senha  # Assuming 'senha' is the hashed password stored in your User model

        if check_password(request_senha, user_senha):
            request.session['user_id'] = user.id_usuario

            '''request.session['user_data'] = {
                'id_usuario': user.id_usuario,
                'nome': user.nome,
                'email': email
            }'''
            
            # Pass user object to template in the 'core' app
            return redirect(reverse('home'))    
        else:
            request.session['error_msg'] = 'Senha Incorreta'
            request.session['email'] = email
            return redirect(reverse('login'))
    else:
        return render(request, 'login.html')

def logout(request):
    if 'user_id' in request.session:
        del request.session['user_id']
        
    origem = request.GET.get('origem')
    if origem:
        return redirect(origem)
    else:
        return redirect(reverse('home'))
        
def del_vars(request):
    cache = {'email', 'error_msg'}
    for var in cache:
        if var in request.session:
            del request.session[var]
    return HttpResponse(status=200)

def upload(request):
    infos = {}
    if 'error_msg' in request.session:
        infos['error_msg'] = request.session['error_msg']
    return render(request, 'upload.html', infos)

def uploading(request):
    if request.method == 'POST':
        formulario = FotoPerfilForm(request.POST, request.FILES)
        if formulario.is_valid():
            formulario.save()
            return redirect('home')
    else:
        formulario = FotoPerfilForm()
    return render(request, 'upload.html', {'formulario': formulario})
    
    
    '''
    imagem = request.POST.get('imagem')
    nova_imagem = FotoPerfil()
    nova_imagem.imagem = imagem
    nova_imagem.save()
    request.session['error_msg'] = 'Foto registrada com sucesso'
    
    return redirect(reverse('upload'))
    '''

def verificar_imagem(request):
    certo = FotoPerfil.objects.get(id=8)
    certo.delete()
    return redirect(reverse('home'))