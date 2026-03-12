from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BuscarPlantaView, PlantasFavoritasView, HistorialBusquedaView

router = DefaultRouter()
router.register(r'plantas-favoritas', PlantasFavoritasView, basename="plantas-favoritas")
router.register(r'historial', HistorialBusquedaView, basename="historial")

urlpatterns = [
    path('buscar/', BuscarPlantaView.as_view(), name="buscar-planta"),
    path('', include(router.urls)),
   
]