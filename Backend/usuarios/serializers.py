from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

User = get_user_model()

class RegistroSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden")

        validate_password(attrs['password'])
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "verificado",
            "date_joined",
            "actualizado"
        ]
        read_only_fields = ["id", "verificado", "date_joined", "actualizado"]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

class LoguotSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs
    
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            raise serializers.ValidationError("Token inválido o expirado.")
        

class VerificarEmailSerializer(serializers.Serializer):
    email_verification_token = PasswordResetTokenGenerator # Deberia ir en util.py e importarlo
    uidb64 = serializers.CharField()  # Usuario ID Base 64
    token = serializers.CharField()

    def validate(self, attrs):
        try:
            uid = force_str(urlsafe_base64_decode(attrs["uidb64"])) # Decodifico el id de usuario
            user = User.objects.get(pk=uid)
        except Exception:
            raise serializers.ValidationError("Enlace inválido.")
        
        if not self.email_verification_token.check_token(user, attrs["token"]):
            raise serializers.ValidationError("Token inválido.")
        
        attrs["user"] = user

        return attrs

    def save(self, **kwargs):
        user = self.validated_data("user")
        user.verificado = True
        user.save()
        return user