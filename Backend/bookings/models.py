from django.db import models
from caregiver.models import Caregiver
from datetime import date
from django.core.exceptions import ValidationError

# Validators
def validate_future_date(value):
    if value < date.today():
        raise ValidationError("Start date must be in the future.")

def validate_duration(value):
    if value < 1:
        raise ValidationError("Duration must be at least 1 month.")

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
