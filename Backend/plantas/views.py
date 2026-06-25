from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import PlantasFavoritas, HistorialBusqueda
from .serializers import PlantasFavoritasSerializer, IdentificarPlantasSerializer, HistorialBusquedaSerializer, BuscarPlantasSerializer, PlantaDetalleSerializer
from .throttles import BusquedaAnonimoThrottle, BusquedaUsuarioThrottles
from .services.api_plant_service import PerenualAPIError, buscar_planta, detalle_planta_api
from .services.traduccion_service import traducir
from .services.identificar_service import PlantnetError, obtener_nombre_cientifico

# Create your views here.
class BuscarPlantaView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [BusquedaAnonimoThrottle, BusquedaUsuarioThrottles]

    def get(self, request):
        nombre = request.query_params.get("search") or request.query_params.get("q")

        if not nombre:
            return Response (
                {"error": "Debes enviar ?search=nombre_planta"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            tr_es = "es"
    
            user = request.user if request.user.is_authenticated else None
            data= buscar_planta(nombre, user)

            # Traducimos al español
            try:
                campos_a_traducir = [
                    "common_name"
                ]

                if "data" in data:
                    for planta in data["data"]:
                        for campo in campos_a_traducir:
                            if planta.get(campo):
                                planta[campo] = traducir(
                                    planta[campo],
                                    tr_es
                                )

            except Exception as e:
                pass

            return Response(data, status=status.HTTP_200_OK)
        
        except PerenualAPIError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

class DetallesPlantaView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request, id_planta):
        try:    
            data = detalle_planta_api(id_planta)
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
    

class IdentificarPlantaView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [BusquedaAnonimoThrottle, BusquedaUsuarioThrottles]

    def post(self,request):
        serializer = IdentificarPlantasSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        imagen = serializer.validated_data["image"]
        try:
            nombre_comun, nombre_cientifico, probabilidad = obtener_nombre_cientifico(imagen)
            user = request.user if request.user.is_authenticated else None
            data = buscar_planta(nombre_cientifico, user)
            if not data.get("data"):
                for name in nombre_comun:
                    data = buscar_planta(name, user)
                    if data.get("data"):
                        break
            
            try:
                tr_es = "es"
                campos_a_traducir = [
                    "common_name"
                ]
                if "data" in data:
                    for planta in data["data"]:
                        for campo in campos_a_traducir:
                            if planta.get(campo):
                                planta[campo] = traducir(
                                    planta[campo],
                                    tr_es
                                )
            except Exception:
                pass

            return Response({
                "probabilidad": probabilidad,
                "nombre comun": nombre_comun,
                "resultado": data
            }, status=status.HTTP_200_OK)
        
        except PlantnetError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        