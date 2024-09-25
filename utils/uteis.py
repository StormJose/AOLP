from usuarios.models import Usuario, FotoPerfil
from estacoes.models import Estacao, Curso
import re

def vars(request):
    variaveis = ('user_id', 'error_msg', 'email')
    infos = {}
    for var in variaveis:
        if var in request.session:
            infos[var] = request.session.get(var)
            
    if 'user_id' in request.session:
        usuario = Usuario.objects.get(id_usuario=infos['user_id'])
        infos['usuario'] = usuario
    
    infos['perfil'] = FotoPerfil.objects.all()
        

    return infos

def pesquisas():
    infos = {}
    estacoes = Estacao.objects.all()
    cursos = Curso.objects.all()
    infos['estacoes'] = estacoes
    infos['cursos'] = cursos
    return infos

def formSenha(request):
    '''Fomarmata a senha dos instrutores que vem em separadas '''
    valores = request.POST.getlist('code-input')
    codigo = ''
    for val in valores:
        codigo = codigo + val
    return codigo

def format_duration(duration):
    # Remove the 'PT' prefix
    duration = duration[2:]

    # Extract hours, minutes, and seconds using regex
    match = re.match(r'(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', duration)
    hours, minutes, seconds = match.groups(default='0')

    # Convert to integers
    hours = int(hours)
    minutes = int(minutes)
    seconds = int(seconds)

    # Format the duration
    parts = []
    if hours:
        parts.append(f"{hours} hora{'s' if hours > 1 else ''}")
    if minutes:
        parts.append(f"{minutes} minuto{'s' if minutes > 1 else ''}")
    if seconds:
        parts.append(f"{seconds} segundo{'s' if seconds > 1 else ''}")

    return ' '.join(parts) if parts else '0 segundos'

 