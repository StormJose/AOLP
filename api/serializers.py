from rest_framework.serializers import ModelSerializer
from usuarios.models import Usuario
from estacoes.models import Estacao, Curso, Aula

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class EstacaoSerializer(ModelSerializer):
    class Meta:
        model = Estacao
        fields = '__all__'

class CursoSerializer(ModelSerializer):
    estacao = EstacaoSerializer(many=True, read_only=True)

    class Meta:
        model = Curso
        fields = '__all__'

class AulaSerializer(ModelSerializer):
    # curso = CursoSerializer(many=True, read_only=True)

    class Meta:
        model = Aula
        fields = '__all__'
