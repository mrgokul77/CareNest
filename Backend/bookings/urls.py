from django.urls import path
from .views import caregiver_hire

urlpatterns = [
    path('caregivers/<int:id>/hire/', caregiver_hire, name='caregiver-hire'),
]
