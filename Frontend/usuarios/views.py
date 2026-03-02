from django.shortcuts import render

# Create your views here.

def loginView(request):
    return render(request, 'login.html')

def registerView(request):
    return render(request, 'register.html')

def homeView(request):
    return render(request, 'home.html')