from django.contrib import admin
from django.urls import path, include
from core import views as core
from usuarios import views 
from estacoes import views as estacoes
from estacoes import crud_views as crud_estacoes
from django.conf import settings
from django.conf.urls.static import static

app_name = 'estacoes'

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', core.home , name='home' ),
    
    path('sobre/', include('sobre.urls')),

    path('forum/', include('forum.urls') ),

    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),

    
    path('usuarios/', views.lista_usuarios,name='lista_usuarios'),
    path('upload/', views.upload, name='upload'),
    path('uploading/', views.uploading, name='uploading'),
    path('img/', views.verificar_imagem,name='ver_img'),
    
    
    path('deletar_vars/', views.del_vars,name='del_vars'),


    # Gerencia todas as URLs para gerenciamento de estacões,
    # cursos e aulas sob 
    # a rota de 'cursos'
    path('estacoes/', include('estacoes.urls',  namespace='estacoes')),


     
    path('admin/', admin.site.urls),


    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
