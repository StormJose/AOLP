from django.shortcuts import render
from utils.uteis import vars

def sobre(request):
    
    return render(request, 'sobre.html', vars(request))