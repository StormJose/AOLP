from django.urls import path
from . import crud_views as views

urlpatterns = [
    path('', views.est_curs, name='est_curs'), # selecionar qual tipo sera alterado
    
    path('estacoes/', views.estacao_list, name='estacao_list'),
    path('estacoes/<int:pk>/', views.estacao_detail, name='estacao_detail'),
    path('estacoes/new/', views.estacao_create, name='estacao_create'),
    path('estacoes/<int:pk>/edit/', views.estacao_edit, name='estacao_edit'),
    path('estacoes/<int:pk>/delete/', views.estacao_delete, name='estacao_delete'),
    
    
    path('cursos/', views.curso_list, name='curso_list'),
    path('cursos/<int:pk>/', views.curso_detail, name='curso_detail'),
    path('cursos/new/', views.curso_create, name='curso_create'),
    path('cursos/<int:pk>/edit/', views.curso_edit, name='curso_edit'),
    path('cursos/<int:pk>/delete/', views.curso_delete, name='curso_delete'),
    
    
    path('aulas/new', views.aula_create, name='aula_create'),

]
