from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 
            'profile_picture', 'auth_method', 'is_email_verified',
            'date_joined'
        ]
        read_only_fields = ['id', 'date_joined', 'auth_method']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration with email/password"""
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            auth_method=User.AUTH_METHOD_EMAIL
        )
        return user


class GoogleAuthSerializer(serializers.Serializer):
    """Serializer for Google OAuth authentication"""
    token = serializers.CharField(required=True)

    def validate_token(self, value):
        if not value:
            raise serializers.ValidationError("Token is required")
        return value


class UserLoginSerializer(serializers.Serializer):
    """Serializer for email/password login"""
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )