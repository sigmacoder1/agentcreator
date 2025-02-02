# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import LoginSerializer, UpdateUserSerializer, UserSerializer
from .models import User

from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected view accessible only with a valid token."},
                        status=status.HTTP_200_OK)

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        # Required fields for creating a user
        required_fields = ['first_name', 'dob', 'phone_number', 'email', 'password']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return Response({field: f"{field} is required." for field in missing_fields},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.create_user(
                first_name=data['first_name'],
                dob=data['dob'],
                phone_number=data['phone_number'],
                email=data['email'],
                password=data['password'],
                last_name=data.get('last_name', '')
            )
            return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Login API
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            # authenticate uses the hashed password to check credentials safely
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)  # create session
                return Response({'message': 'Logged in successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Logout API
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)

# Google Login API (dummy implementation)
class GoogleLoginView(APIView):
    def post(self, request):
        # In production, integrate with a proper OAuth2 flow (e.g., using django-allauth or python-social-auth)
        google_token = request.data.get('google_token')
        if not google_token:
            return Response({'error': 'Google token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        # Dummy validation: In a real scenario, validate the token with Google's API
        # Assume the token is valid and user info is extracted:
        email = 'user@example.com'  # Replace with extracted email
        first_name = 'Google'
        dob = '2000-01-01'          # Replace with appropriate default or extracted data
        phone_number = '0000000000' # Replace with appropriate default or extracted data
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Create a user with a random password if not already existing.
            user = User.objects.create_user(
                first_name=first_name,
                dob=dob,
                phone_number=phone_number,
                email=email,
                password=User.objects.make_random_password()
            )
        login(request, user)
        return Response({'message': 'Logged in with Google successfully.'}, status=status.HTTP_200_OK)

# Update User Details API
class UpdateUserDetailsView(APIView):
    def put(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = UpdateUserSerializer(instance=request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User details updated successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
