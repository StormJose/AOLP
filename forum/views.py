from django.shortcuts import render
from utils.uteis import vars

def forum(request):
    
    return render(request, 'forum.html', vars(request))