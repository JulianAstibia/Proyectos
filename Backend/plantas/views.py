from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .services import PerenualAPIError, buscar_planta
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import PlantasFavoritas, HistorialBusqueda
from .serializers import PlantasFavoritasSerializer, HistorialBusquedaSerializer
from .throttles import BusquedaAnonimoThrottle, BusquedaUsuarioThrottles

# Create your views here.
class BuscarPlantaView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [BusquedaAnonimoThrottle, BusquedaUsuarioThrottles]


    def get(self, request):
        nombre = request.query_params.get("q")

        if not nombre:
            return Response (
                {"error": "Debes enviar ?q=nombre_planta"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            data= buscar_planta(nombre, request.user)
            return Response(data, status=status.HTTP_200_OK)
        
        except PerenualAPIError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )


class PlantasFavoritasView(ModelViewSet):
    serializer_class = PlantasFavoritasSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PlantasFavoritas.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class HistorialBusquedaView(ReadOnlyModelViewSet):
    serializer_class = HistorialBusquedaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HistorialBusqueda.objects.filter(usuario=self.request.user)