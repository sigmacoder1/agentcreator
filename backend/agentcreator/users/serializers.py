# users/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'first_name', 'last_name', 'dob', 'phone_number', 'email',
            'verified_email', 'verified_phone', 'createdon', 'updatedon'
        ]
        read_only_fields = ['username', 'verified_email', 'verified_phone', 'createdon', 'updatedon']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Allow updating only certain fields – adjust as needed.
        fields = ['first_name', 'last_name', 'dob', 'phone_number']
