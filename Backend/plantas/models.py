from django.db import models
from django.conf import settings

# Class Meta se usa para:
#   Configurar cómo se comporta el modelo en la base de datos y en Django.
#   No para guardar datos.

# Create your models here.
class PlantasFavoritas(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="plantas_favoritas")
    id_planta_api = models.CharField(max_length=100) 
    nombre_comun = models.CharField(max_length=150)
    nombre_cientifico = models.CharField(max_length=150)
    imagen = models.URLField(blank=True)
    agregado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-agregado"]
        unique_together = ("usuario", "id_planta_api")

    def __str__(self):
        return f"{self.nombre_comun} - {self.usuario}"
    

class HistorialBusqueda(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="historial_busqueda")
    query = models.CharField(max_length=200)
    fecha = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha"]
        unique_together = ("usuario", "query")

    def __str__(self):
        return f"{self.query} - {self.usuario}"