from django.urls import path
from . import crud_views
from . import views
from api import views as api_views

app_name = 'estacoes'

urlpatterns = [
    # path('', crud_views.est_curs, name='est_curs'),
    
    ## estacoes

    # caso necessário
    # path('estacoes/<int:pk>/', crud_views.estacao_detail, name='estacao_detail'),
    
    path('admin', crud_views.estacao_list, name='estacao_list'),

    # instrutor / admin
    path('new/', crud_views.estacao_create, name='estacao_create'),
    path('<int:pk>/edit/', crud_views.estacao_edit, name='estacao_edit'),
    path('<int:pk>/delete/', crud_views.estacao_delete, name='estacao_delete'),
    
    ## cursos

    path('cursos/', views.cursos, name='cursos'),
    path('<str:estacao_nome>/cursos/', views.curso, name='curso'),
    # instrutor / admin
    path('cursos/admin', crud_views.curso_list, name='curso_list'),
    path('cursos/new', crud_views.curso_create, name='curso_create'),
    path('cursos/<str:nome>/', crud_views.curso_detail, name='curso_detail'),
    path('cursos/<int:pk>/edit/', crud_views.curso_edit, name='curso_edit'),
    path('cursos/<int:pk>/delete/', crud_views.curso_delete, name='curso_delete'),

  
    ## aulas
    # todas as aulas
    path('aulas/admin', crud_views.aulas_list, name='aulas_list'),

    path('<str:curso_nome>/aulas', views.aulas, name='aulas'), 
    path('<str:curso_nome>/aulas/<str:aula_titulo>', views.aula, name='aula'), 
    
    # instrutor / admin
    path('aulas/new', crud_views.aula_create, name='aula_create'),
    path('aulas/<int:pk>/edit', crud_views.aula_edit, name='aula_edit'),
    path('aulas/<int:pk>/delete', crud_views.aula_delete, name='aula_delete'),
    path('questoes/<int:id>', views.questao, name='questao'),
    
]
