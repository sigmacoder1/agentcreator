# users/urls.py
from django.urls import path
from .views import LoginView, LogoutView, GoogleLoginView, UpdateUserDetailsView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('update-user/', UpdateUserDetailsView.as_view(), name='update-user'),
]

