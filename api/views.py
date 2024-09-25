from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, render, redirect
from usuarios.models import Usuario
from estacoes.models import Estacao, Curso, Aula
from .serializers import UsuarioSerializer
from .serializers import EstacaoSerializer, CursoSerializer, AulaSerializer
from estacoes.forms import EstacaoForm, CursoForm, AulaForm
from django.db.models import Q

class ExampleAPIView(APIView):
    def get(self, request):
        data = {'message': 'Hello from DRF API!'}
        return Response(data)

@api_view(['GET','POST'])
def usuarios_lista(request):
    if request.method == 'GET':
        query = request.GET.get('query')

        if query == None:
            query = ''

        usuarios = Usuario.objects.filter(Q(nome__icontains=query) | Q(email__icontains=query))
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        usuarios = Usuario.objects.create(
            # id_usuario=request.data['id_usuario'],
            nome=request.data['nome'],
            email=request.data['email'],
            )
        
        serializer = UsuarioSerializer(usuarios, many=False)

        return Response(serializer.data)

@api_view(['GET','PUT','DELETE'])
def usuario_detail(request, pk):
    usuario = Usuario.objects.get(pk=pk)

    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario, many=False)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        usuario.nome = request.data['nome']
        usuario.email = request.data['email']

        usuario.save()
        serializer = UsuarioSerializer(usuario, many=False)
        return Response(serializer.data)
    
    if request.method == 'DELETE':
        usuario.delete()
        return Response('usuario deletado')


@api_view(['GET', 'POST'])
def estacao_list(request):
    if request.method == 'GET':
        query = request.GET.get('query')

        if query == None:
            query = ''

        estacoes = Estacao.objects.filter(Q(nome__icontains=query) | Q(descricao__icontains=query))
        serializer = EstacaoSerializer(estacoes, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        estacoes = Estacao.objects.create(
            nome=request.data['nome'],
            descricao=request.data['descricao'],
            )
        
        serializer = EstacaoSerializer(estacoes, many=False)

        return Response(serializer.data)
    

@api_view(['GET','PUT','DELETE'])
def estacao_detail(request, nome):
    estacao = Estacao.objects.get(nome=nome)

    if request.method == 'GET':
        serializer = EstacaoSerializer(estacao, many=False)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        estacao.nome = request.data['nome']
        estacao.descricao = request.data['descricao']

        estacao.save()
        serializer = EstacaoSerializer(estacao, many=False)
        return Response(serializer.data)
    
    if request.method == 'DELETE':
        estacao.delete()
        return Response('estacao deletada')



#Curso Views
# @api_view(['GET', 'POST'])
# def curso_list(request):
#     if request.method == 'GET':
#         query = request.GET.get('query')

#         if query == None:
#             query = ''

#         cursos = Curso.objects.filter(Q(nome__icontains=query) | Q(descricao__icontains=query) | Q(estacao__nome__icontains=query))
#         serializer = CursoSerializer(cursos, many=True)
#         return Response(serializer.data)
    
#     if request.method == 'POST':
#         cursos = Curso.objects.create(
#             nome=request.data['nome'],
#             descricao=request.data['descricao'],
#             estacao=request.data['estacao'],
#             )
        
#         serializer = CursoSerializer(cursos, many=False)

        # return Response(serializer.data)

@api_view(['GET', 'POST'])
def curso_list(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        cursos = Curso.objects.filter(
            Q(nome__icontains=query) | 
            Q(descricao__icontains=query) | 
            Q(estacao__nome__icontains=query)
        )
        serializer = CursoSerializer(cursos, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        # Extract data from request
        nome = request.data.get('nome')
        descricao = request.data.get('descricao')
        estacao_data = request.data.get('estacao', [])

        # Create a new Curso instance
        curso = Curso.objects.create(
            nome=nome,
            descricao=descricao
        )

        # Handle many-to-many relationships
        estacoes = []
        for estacao_info in estacao_data:
            estacao_id = estacao_info.get('id')
            estacao_nome = estacao_info.get('nome')
            estacao_descricao = estacao_info.get('descricao')

            # Find or create the Estacao instance
            estacao, created = Estacao.objects.get_or_create(
                id=estacao_id,
                defaults={'nome': estacao_nome, 'descricao': estacao_descricao}
            )
            estacoes.append(estacao)

        # Assign the related Estacao objects to the Curso instance
        curso.estacao.set(estacoes)
        
        # Serialize and return the response
        serializer = CursoSerializer(curso)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'POST', 'DELETE'])
def curso_detail(request, nome):
    curso = Curso.objects.get(nome=nome)

    if request.method == 'GET':
        serializer = CursoSerializer(curso, many=False)
        return Response(serializer.data)
    
    if request.method in ['POST', 'PUT']:
        curso.nome = request.data['nome']
        curso.descricao = request.data['descricao']
        curso.estacao = request.data['estacao']

        curso.save()
        serializer = CursoSerializer(curso, many=False)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        curso.nome = request.data['nome']
        curso.descricao = request.data['descricao']
        curso.estacao = request.data['estacao']

        curso.save()
        serializer = CursoSerializer(curso, many=False)
        return Response(serializer.data)
    
    if request.method == 'DELETE':
        curso.delete()
        return Response('curso deletado')

@api_view(['GET','POST'])
def aula_list(request):
    if request.method == 'GET':
        query = request.GET.get('query')

        if query == None:
            query = ''
        
        aulas = Aula.objects.filter(Q(titulo__icontains=query) | Q(url__icontains=query) | Q(descricao__icontains=query) | Q(curso__nome__icontains=query))
        serializer = AulaSerializer(aulas, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        # aulas = Aula.objects.create(
        #     titulo=request.data['titulo'],
        #     url=request.data['url'],
        #     descricao=request.data['descricao'],
        #     curso=request.data['curso'],
        # )
        curso_nome = request.data['curso']
        curso = get_object_or_404(Curso, nome=curso_nome)
        
        aulas = Aula.objects.create(
            titulo=request.data['titulo'],
            url=request.data['url'],
            descricao=request.data['descricao'],
            curso=curso,
        )

        serializer = AulaSerializer(aulas, many=False)

        return Response(serializer.data)

@api_view(['GET','PUT','DELETE'])
def aula_detail(request, pk):
    aula = get_object_or_404(Aula, pk=pk)
    
    if request.method == 'GET':
        serializer = AulaSerializer(aula, many=False)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        curso_nome = request.data['curso']
        curso = get_object_or_404(Curso, nome=curso_nome)

        aula.titulo = request.data['titulo']
        aula.url = request.data['url']
        aula.descricao = request.data['descricao']
        aula.curso = curso

        aula.save()
        serializer = AulaSerializer(aula, many=False)
        return Response(serializer.data)
    
    if request.method == 'DELETE':
        aula.delete()
        return Response('aula deletada')