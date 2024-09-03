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
    pesquisas_data = pesquisas(request)
    
    context = {**pesquisas_data , **infos, **vars_data}
    # Combine both dictionaries
    return render(request, 'estacoes.html', context)

def cursos(request):
    vars_data = vars(request)

    infos = {}
    # estacao = Estacao.objects.all()

    estacoes_tags = Estacao.objects.all()
    
    estacoes = Estacao.objects.all()
    current_id = request.resolver_match.kwargs.get('id')
  
    infos['estacoes_tags'] = estacoes_tags
    infos['estacoes'] = estacoes
    infos['current_id'] = current_id

    print(infos)
    context = {**infos, **vars_data}

    if request.headers.get('x-requested-with') == 'XMLHttpRequest': 
        return render(request, 'partials/cursos_list.html', context)
    

    return render(request, 'cursos.html', context)

def curso(request, id):
    vars_data = vars(request)

    infos = {}
    estacoes_tags = Estacao.objects.all()
    estacoes = [get_object_or_404(Estacao, id=id)]
    current_id = request.resolver_match.kwargs.get('id')
  
    infos['estacoes_tags'] = estacoes_tags
    infos['estacoes'] = estacoes
    infos['current_id'] = current_id

   
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        estacao_id = request.GET.get('estacao_id')
        
        if estacao_id:
            estacao = Estacao.objects.filter(id=estacao_id).first()
            # cursos = estacao.cursos.all() if estacao else []
        else:
            cursos = []

       
        return render(request, 'partials/cursos_list.html', {'estacoes': estacoes})


    context = {**infos, **vars_data}

    return render(request, 'cursos.html', context)



def aulas(request, id):
    vars_data = vars(request)

    infos = {}
    curso = Curso.objects.get(id=id)
    infos['curso'] = curso
  
    context = {**infos, **vars_data}
    return render(request, 'aulas_list.html', context)


def aula(request, id):
    infos = {}
    aula = Aula.objects.get(id=id)
    infos['aula'] = aula

    # return render(request, 'aula.html', infos)
    return JsonResponse(aula)

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

    
 
