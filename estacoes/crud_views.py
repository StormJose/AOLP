from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404, redirect, reverse
from .models import Estacao, Curso, Aula
from .forms import EstacaoForm, CursoForm, AulaForm


# Estação Views
def est_curs(request):
    return render(request, 'api/est_curs.html')

def estacao_list(request):
    estacoes = Estacao.objects.all()
    return render(request, 'api/estacao_list.html', {'estacoes': estacoes})

def estacao_detail(request, pk):
    estacao = get_object_or_404(Estacao, pk=pk)
    return render(request, 'api/estacao_detail.html', {'estacao': estacao})


def estacao_create(request):
    # aqui ta correto 
    if request.method == "POST":
        form = EstacaoForm(request.POST)
        if form.is_valid():
            estacao = form.save()
            return redirect('estacoes:estacao_list')
    else:
        form = EstacaoForm()
        context = {
            'form': form,   
        }
    return render(request, 'api/estacao_form.html', context)

def estacao_edit(request, pk):
    estacao = get_object_or_404(Estacao, pk=pk)
    if request.method == "POST":
        form = EstacaoForm(request.POST, instance=estacao)
        if form.is_valid():
            estacao = form.save()
            return redirect('estacoes:estacao_list')
    else:
        form = EstacaoForm(instance=estacao)
        context = {
            'estacao': estacao,
            'form': form,   
        }
    return render(request, 'api/estacao_form.html', context)

def estacao_delete(request, pk):
    estacao = get_object_or_404(Estacao, pk=pk)

    if request.method == "POST":
        estacao.delete()
        return redirect('estacoes:estacao_list')
    
    context = {
        'conteudo': estacao,
        'action_url': reverse(f'estacoes:estacao_delete', kwargs={'pk': estacao.pk}),
    }
    return render(request, 'api/confirm_delete.html', context)

# ----===----===---===----===---===- Cursos -===---===---===----===----

# Instrutor & Admin Only
def curso_list(request):
    cursos = Curso.objects.all()
    return render(request, 'api/curso_list.html', {'cursos': cursos})

def curso_detail_by_id(request, pk):
    curso = get_object_or_404(Curso, pk=pk)
    
    return render(request, 'api/curso_detail.html', {'curso': curso})


def curso_detail(request, nome):
    curso = get_object_or_404(Curso, nome=nome)
    return render(request, 'api/curso_detail.html', {'curso': curso})

@csrf_exempt
def curso_create(request):
    if request.method == "POST":
        form = CursoForm(request.POST)
        if form.is_valid():
            curso = form.save()
            return redirect('estacoes:curso_list')
        
    else:
        form = CursoForm()

    context = {
        'form': form,
        'estacoes': Estacao.objects.all()
    }
    return render(request, 'api/curso_form.html', context)

def curso_edit(request, pk):
    curso = get_object_or_404(Curso, pk=pk)
    if request.method == "POST":
        form = CursoForm(request.POST, instance=curso)
        if form.is_valid():
            curso = form.save()
            return redirect('estacoes:curso_list')
    else:
        form = CursoForm(instance=curso)

    context = {
            'curso': curso,
            'estacoes': Estacao.objects.all(),
            'form': form
        }

    return render(request, 'api/curso_form.html', context)

def curso_delete(request, pk):
    curso = get_object_or_404(Curso, pk=pk)
    if request.method == "POST":
        curso.delete()
        return redirect(reverse('curso_list'))
    
    context = {
        'conteudo': curso,
        'action_url': reverse(f'estacoes:curso_delete', kwargs={'pk': curso.pk}),
    }
    return render(request, 'api/confirm_delete.html', context)


def aulas_list(request):
    aulas = Aula.objects.all()
    cursos = Curso.objects.all()

    context = {
        'aulas': aulas,
        'curso': cursos
    }
    return render(request, 'api/aula_list.html', context)


# lINK DA AULA DEVE ESTAR NO SEGUINTE FORMATO
# https://www.youtube.com/embed/aTgXgN9fOsk?si=w6r-nAf1KHYJhTF4
def aula_create(request):
    if request.method == "POST":
       
        nova_aula = Aula()
        nova_aula.titulo = request.POST.get('titulo')
        nova_aula.url = request.POST.get('video')  
        nova_aula.descricao = request.POST.get('descrição')

        curso_id = request.POST.get('curso')
        
        # Procurando instancia de curso
        curso = get_object_or_404(Curso, id=curso_id)
        
        # Designando instancia à aula
        nova_aula.curso = curso
        
        nova_aula.save()
        
        return redirect(reverse('estacoes:aulas_list'))
    else:
        # Passa todas as instâncias de cursos para o template
        cursos = Curso.objects.all()
        return render(request, 'api/aula_form.html', {'cursos': cursos})

def aula_edit(request):
   # TO DO
   # É contigo
   None

@csrf_exempt
def aula_delete(request, pk):
    aula = get_object_or_404(Aula, pk=pk)

    if request.method == "POST":
        aula.delete()
     
        return redirect(reverse('estacoes:cursos'))
    
    context = {
        'conteudo': aula,
        'action_url': reverse(f'estacoes:aula_delete', kwargs={'pk': aula.pk}),
    }
    print(context)
    return render(request, 'api/confirm_delete.html', context)