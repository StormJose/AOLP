from estacoes.views import get_detalhes_aula
from django.urls import path
from . import views

urlpatterns = [
    path('example/', views.ExampleAPIView.as_view(), name='example'),
    path('usuarios/', views.usuarios_lista, name='usuarios_lista'),
    path('usuarios/<str:pk>', views.usuario_detail, name="usuario_detail"),
    
    # urls de estações
    path('estacoes/', views.estacao_list, name='estacao_list'),
    path('estacoes/<str:nome>/', views.estacao_detail, name='estacao_detail'),
    # Get e post na primeira URL, Get Put e Delete na segunda
    
    # urls de cursos
    path('cursos/', views.curso_list, name='curso_list'),
    path('cursos/', views.curso_detail, name='curso_detail'),

    # urls de aulas
    path('aulas/', views.aula_list, name='aula_list'),
    path('aulas/<str:pk>/', views.aula_detail, name='aula_detail'),
    path('get_aula/<str:video_id>/', get_detalhes_aula, name='get_detalhes_aula')
]