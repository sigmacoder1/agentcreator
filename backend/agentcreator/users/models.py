# users/models.py
import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, first_name, dob, phone_number, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not first_name:
            raise ValueError("First name is required")
        if not dob:
            raise ValueError("Date of birth is required")
        if not phone_number:
            raise ValueError("Phone number is required")
        email = self.normalize_email(email)
        # Generate a system unique username
        username = str(uuid.uuid4())
        user = self.model(
            username=username,
            first_name=first_name,
            dob=dob,
            phone_number=phone_number,
            email=email,
            **extra_fields
        )
        # Use Django's built-in password hashing
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, dob, phone_number, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(first_name, dob, phone_number, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    dob = models.DateField()
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    verified_email = models.BooleanField(default=False)
    verified_phone = models.BooleanField(default=False)
    createdon = models.DateTimeField(auto_now_add=True)
    updatedon = models.DateTimeField(auto_now=True)

    # Additional flags for Django admin
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    # Set email as the login field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'dob', 'phone_number']

    def __str__(self):
        return self.email
