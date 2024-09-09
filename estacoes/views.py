from googleapiclient.discovery import build
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from .models import Curso, Estacao, Aula
from django.http import JsonResponse
from utils.uteis import format_duration
from utils.uteis import pesquisas
from utils.uteis import vars



API_KEY = 'AIzaSyB9bVY68BG0Y6758Pv2wfq95UZ5kmz88kk'

def estacoes(request):
    infos = {}

    vars_data = vars(request)
    pesquisas_data = pesquisas()
    
    context = {**pesquisas_data , **infos, **vars_data}
    # Combine both dictionaries
    return render(request, 'estacoes.html', context)

def cursos(request):
    vars_data = vars(request)

    infos = {}

    estacoes_tags = Estacao.objects.all()
    
    estacoes = Estacao.objects.all()
  
    infos['estacoes_tags'] = estacoes_tags
    infos['estacoes'] = estacoes

    print(infos)
    context = {**infos, **vars_data}

    if request.headers.get('x-requested-with') == 'XMLHttpRequest': 
        return render(request, 'partials/cursos_list.html', context)
    
    return render(request, 'cursos.html', context)


def curso(request, estacao_nome):
    vars_data = vars(request)

    infos = {}
    estacoes_tags = Estacao.objects.all()
    estacoes = [get_object_or_404(Estacao, nome=estacao_nome)]

    infos['estacoes_tags'] = estacoes_tags
    infos['estacoes'] = estacoes


    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        estacao_tag = request.GET.get('estacao_sigla')
        
        return render(request, 'partials/cursos_list.html', {'estacoes': estacoes})

    
    context = {**infos, **vars_data}
    return render(request, 'cursos.html', context)



def aulas(request, curso_nome):
    # TO DO: Implementar uma forma de selecionar,
    # de maneira dinâmica, a aula mais recente vista pelo usuário.
    
    # Por enquanto, a primeira aula do curso será colocada como ativa
    curso = get_object_or_404(Curso, nome=curso_nome)
    aulas =  Aula.objects.filter(curso=curso)
    active_aula = aulas.first()
    
    context = {
        'curso': curso,
        'active_aula': active_aula,
        'aulas': aulas,
        'active_questao': None
    }
    print(aulas)
    return render(request, 'aulas_list.html', context)

def aula(request, curso_nome, aula_titulo):
    # TO DO: Implementar uma forma de selecionar,
    # de maneira dinâmica, a aula mais recente vista pelo usuário.
    
    # Por enquanto, a primeira aula do curso será colocada como ativa
    curso = get_object_or_404(Curso, nome=curso_nome)
    active_aula = get_object_or_404(Aula, curso=curso, titulo=aula_titulo)
    aulas = Aula.objects.filter(curso=curso)


    context = {
        'curso': curso,
        'active_aula': active_aula,
        'aulas': aulas,
        'active_questao': None
    }

    return render(request, 'aulas_list.html', context)


# caso necessário
def aula_by_id(request, id):
 
    aula = Aula.objects.get(id=id)
    curso = Aula.objects.get(curso=aula.id)

    context = {
        'aula': aula,
        'curso': curso,
        'active_aula_id': aula.id
    }

    return render(request, 'aulas_list.html', context) 


def questao(request, id):
    # Exemplo, já que ainda não existe.
    # TO DO - Obs: Se possível, na hora de criar os models.py de 
    # questões, adicionar também um atributo de xp / recompensa ganha por questão certa
    
    # questao = Questao.objects.get(id=id)
    # aula = questao.aula  
    # curso = aula.curso
    context = {
        'curso': curso,
        'active_aula_id': aula.id,
        # 'active_questao_id': questao.id
    }
    return render(request, 'aulas_list.html', context)



def get_detalhes_aula(request, video_id):

    youtube = build('youtube', 'v3', developerKey=API_KEY)
    request = youtube.videos().list(part='snippet,contentDetails', id=video_id)
    response = request.execute()
    duracao = format_duration(response['items'][0]['contentDetails']['duration'])

    video_details = {   
        'titulo': response['items'][0]['snippet']['title'],
        'duracao': duracao,
        'canal_id': response['items'][0]['snippet']['channelId']
    }

    return JsonResponse(video_details)

    

