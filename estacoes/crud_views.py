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



# Admin Only
def estacao_create(request):
    # aqui ta correto 
    if request.method == "POST":
        form = EstacaoForm(request.POST)
        if form.is_valid():
            estacao = form.save()
            return redirect('api/estacao_create.html', pk=estacao.pk)
    else:
        form = EstacaoForm()
    return render(request, 'api/estacao_form.html', {'form': form})

def estacao_edit(request, pk):
    estacao = get_object_or_404(Estacao, pk=pk)
    # utilizar o metodo PATCH OU PUT
    if request.method == "POST":
        form = EstacaoForm(request.POST, instance=estacao)
        if form.is_valid():
            estacao = form.save()
            return redirect('api/estacao_detail', pk=estacao.pk)
    else:
        form = EstacaoForm(instance=estacao)
    return render(request, 'api/estacao_form.html', {'form': form})

def estacao_delete(request, pk):
    estacao = get_object_or_404(Estacao, pk=pk)
    # utilizar o metodo DELETE
    if request.method == "POST":
        estacao.delete()
        return redirect('estacao_list')
    return render(request, 'api/estacao_confirm_delete.html', {'estacao': estacao})

# ----===----===---===----===---===- Cursos -===---===---===----===----

# Instrutor & Admin Only
def curso_list(request):
    cursos = Curso.objects.all()
    return render(request, 'api/curso_list.html', {'cursos': cursos})

def curso_detail(request, pk):
    curso = get_object_or_404(Curso, pk=pk)
    return render(request, 'api/curso_detail.html', {'curso': curso})

@csrf_exempt
def curso_create(request):
    if request.method == "POST":
        form = CursoForm(request.POST)
        if form.is_valid():
            curso = form.save()
            return redirect('curso_detail',  pk=curso.pk)
    else:
        form = CursoForm()

    context = {
        'form': form,
        'estacoes': Estacao.objects.all()
    }
    return render(request, 'api/curso_create.html', context)

def curso_edit(request, pk):
    curso = get_object_or_404(Curso, pk=pk)
    if request.method == "POST":
        form = CursoForm(request.POST, instance=curso)
        if form.is_valid():
            curso = form.save()
            return redirect('curso_detail', pk=curso.pk)
    else:
        form = CursoForm(instance=curso)
    return render(request, 'api/curso_form.html', {'form': form})

def curso_delete(request, pk):
    curso = get_object_or_404(Curso, pk=pk)
    if request.method == "POST":
        curso.delete()
        return redirect('curso_list')
    return render(request, 'api/curso_confirm_delete.html', {'curso': curso})

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
        
        return redirect(reverse('home'))
    else:
        # Pass all Curso instances to the template
        cursos = Curso.objects.all()
        return render(request, 'api/aula_form.html', {'cursos': cursos})


@csrf_exempt
def aula_delete(request, pk):
    aula = get_object_or_404(Aula, pk=pk)
    if request.method == "POST":
        aula.delete()
        print(pk)
        return redirect('cursos')
    return render(request, 'api/aula_confirm_delete.html', {'aula': aula})