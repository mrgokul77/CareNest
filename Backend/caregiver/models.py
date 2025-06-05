from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from datetime import date

# Validators
def validate_min_age(value):
    if value < 20:
        raise ValidationError("Age must be at least 20 years.")

def validate_experience(value):
    if value < 1:
        raise ValidationError("Experience must be at least 1 year.")

def validate_future_date(value):
    if value < date.today():
        raise ValidationError("Start date must be in the future.")

def validate_duration(value):
    if value < 1:
        raise ValidationError("Duration must be at least 1 month.")

# ✅ User Profile Model
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
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
        return self.user.username

# ✅ Caregiver Model
class Caregiver(models.Model):
    SPECIALITIES = (
        ("Personal Care", "Personal Care"),
        ("Companion Care", "Companion Care"),
        ("Dementia Care", "Dementia Care"),
        ("Mobility Assistance", "Mobility Assistance"),
        ("Medication Management", "Medication Management"),
    )

    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField(validators=[validate_min_age])
    experience = models.PositiveIntegerField(validators=[validate_experience])
    speciality = models.CharField(max_length=50, choices=SPECIALITIES, default="Personal Care")
    availability = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# ✅ Hiring Record Model
class HiringRecord(models.Model):
    caregiver = models.ForeignKey(Caregiver, on_delete=models.CASCADE, related_name='hiring_records')
    client_name = models.CharField(max_length=100)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20)
    start_date = models.DateField(validators=[validate_future_date])  # Ensuring future dates
    duration = models.IntegerField(validators=[validate_duration], help_text="Duration in months")
    requirements = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_name} hired {self.caregiver.name}"

