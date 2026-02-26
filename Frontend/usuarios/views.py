from django.shortcuts import render

# Create your views here.

def loginView(request):
    return render(request, 'login.html')

def homeView(request):
    return render(request, 'home.html')

def registerView(request):
    return render(request, 'register.html')