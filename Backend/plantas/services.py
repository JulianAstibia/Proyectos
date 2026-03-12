import requests
from django.conf import settings
from .models import HistorialBusqueda

BASE_URL = "https://perenual.com/api/v2"

class PerenualAPIError(Exception):
    pass


def buscar_planta(nombre,user):
    data = buscar_planta_api(nombre)
    nombre = nombre.strip().lower()

    HistorialBusqueda.objects.update_or_create(
        usuario=user,
        query=nombre,
        defaults={}  # por si quisiera actualizar algun campo más adelante
    )
    return data


def buscar_planta_api(nombre):
    url = f'{BASE_URL}/species-list'
    params = {
        "key": settings.PERENUAL_API_KEY,
        "q": nombre
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        raise PerenualAPIError("La API externa tardó demasiado en responder")
    
    except requests.exceptions.RequestException as e:
        raise PerenualAPIError(f"Error al conectar con API externa: {str(e)}")