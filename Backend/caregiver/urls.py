from django.urls import path
from .views import (
    caregiver_list, caregiver_detail, caregiver_update
)

urlpatterns = [
    path('', caregiver_list, name='caregiver-list'),
    path('<int:id>/', caregiver_detail, name='caregiver-detail'),
    path('<int:id>/update/', caregiver_update, name='caregiver-update'),
]
