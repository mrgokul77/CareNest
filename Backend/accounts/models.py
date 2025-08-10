from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    # Add custom fields here if needed in future
    pass

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('caregiver', 'Caregiver'),
        ('family', 'Family')
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='family')
    phone = models.CharField(max_length=15, blank=True, default="")
    address_line1 = models.CharField(max_length=255, blank=True, default="")
    address_line2 = models.CharField(max_length=255, blank=True, default="")
    gender = models.CharField(
        max_length=10,
        choices=[("male", "Male"), ("female", "Female")],
        blank=True,
        null=True
    )
    dob = models.DateField(null=True, blank=True)
    profile_pic = models.URLField(blank=True, default="")

    def __str__(self):
        return f"{self.user.username} - {self.role}"
