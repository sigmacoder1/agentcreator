# project/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import ProtectedView  # the new protected API view

urlpatterns = [
    path('api/users/', include('users.urls')),
    # JWT token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Protected view using token authentication
    path('api/protected/', ProtectedView.as_view(), name='protected'),
]

