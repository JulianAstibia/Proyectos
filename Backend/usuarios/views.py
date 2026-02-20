from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import (
    RegistroSerializer, UserSerializer, ChangePasswordSerializer,
    LoguotSerializer, VerificarEmailSerializer,
    )

# Falta:
#   Bloque de cuenta si no está verificado
#   Enviar email de verificacion

# Create your views here.
Usuario = get_user_model()

class RegistroView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user= request.user

        if not user.check_password(serializer.validated_data["old_password"]):
            return Response(
                {"old_password": "La contraseña actual es incorrecta."},
                status=status.HTTP_400_BAD_REQUEST,
                )
        
        user.set_password(serializer.validated_data["new_password"])
        user.save()

        return Response(
            {'detail': 'Contraseña actualizada correctamente.'},
            status=status.HTTP_200_OK,
        )
    

class LogoutView(generics.GenericAPIView):
    serializer_class = LoguotSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Logout exitoso."},
            status=status.HTTP_205_RESET_CONTENT,
        )
    

class VerificarEmailView(generics.GenericAPIView):
    serializer_class = VerificarEmailSerializer

    def get(self, request, uidb64, token):
        serializer = self.get_serializer(
            data={
                'uidb64': uidb64,
                'token': token
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'detail': 'Email verificado correctamente.'},
            status=status.HTTP_200_OK,
        )
    
