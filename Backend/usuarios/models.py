from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# AbstractUser tiene por defecto: 
#   username, password, last_login --> campos de autenticacion
#   first_name, last_name, email(no es unico) --> informacion personal
#   is_staff, is_active, is_superuser, groups, user_permissions --> permisos y estados
#   date_joined --> fecha de creacion del usuario

class Usuario(AbstractUser):
    email= models.EmailField(unique=True) # lo modifique a unico
    verificado= models.BooleanField(default=False)
    actualizado= models.DateTimeField(auto_now=True)

    USERNAME_FIELD= 'email'         # Cambie el campo de email para autenticar
    REQUIRED_FIELDS= ['username']