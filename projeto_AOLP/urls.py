from django.contrib import admin
from django.urls import path, include
from core import views as core
from sobre import views as sobre
from forum import views as forum
from usuarios import views 
from estacoes import views as estacoes
from estacoes import crud_views as crud_estacoes
from perfil import views as perfil
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', core.home , name='home' ),
    
    path('sobre/', include('sobre.urls')),

    path('forum/', include('forum.urls') ),

    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('perfil/', views.perfil_usuario, name='user_profile'),
    
    
    path('usuarios/', views.lista_usuarios,name='lista_usuarios'),
    path('upload/', views.upload, name='upload'),
    path('uploading/', views.uploading, name='uploading'),
    path('img/', views.verificar_imagem,name='ver_img'),
    
    
    path('deletar_vars/', views.del_vars,name='del_vars'),
    
    
    path('estacoes/', estacoes.estacoes, name='estacoes'),
    # path('estacoes/new'),
    path('cursos/', estacoes.cursos, name='cursos'),
    path('cursos/<int:id>', estacoes.curso, name='curso'),
    path('cursos/new', crud_estacoes.curso_create, name='curso_create'),
    path('cursos/<str:pk>/delete', crud_estacoes.curso_delete, name='curso_delete'),

    path('aulas/<int:id>', estacoes.aulas, name='aulas'),
    path('aula/<int:id>', estacoes.aula, name='aula'),
    path('aulas/new', crud_estacoes.aula_create, name='aula_create'),

    path('aulas/<int:pk>/delete', crud_estacoes.aula_delete, name='aula_delete'),
   

     
    path('admin/', admin.site.urls),

    path('perfil/', perfil.perfil, name='perfil'),


    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
