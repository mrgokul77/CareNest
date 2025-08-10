from django.db import models
from django.core.exceptions import ValidationError

# Validators
def validate_min_age(value):
    if value < 20:
        raise ValidationError("Age must be at least 20 years.")

def validate_experience(value):
    if value < 1:
        raise ValidationError("Experience must be at least 1 year.")

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
