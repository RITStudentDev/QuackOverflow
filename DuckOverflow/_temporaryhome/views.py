from django.shortcuts import render

def render_home(request):
    return render(request, 'home.html')

def index(request):
    return render(request, 'index.html')