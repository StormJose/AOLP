from django.shortcuts import render, redirect, reverse
from usuarios.models import Usuario
from utils.uteis import vars

def home(request):
    # user_id = request.session.get('user_id')
      
    return render(request, 'index.html', vars(request))
      