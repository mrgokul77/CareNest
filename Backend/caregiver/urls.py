from django.urls import path
from .views import (
    signup, login, logout_user, caregiver_list, caregiver_detail, caregiver_update,
    caregiver_hire, user_profile
)

urlpatterns = [
    # Authentication Endpoints
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout_user, name='logout'),

    # User Profile Endpoints
    path('profile/', user_profile, name='user-profile'),

    # Caregiver API Endpoints
    path('caregivers/', caregiver_list, name='caregiver-list'),  # Ensure this path is used for caregiver creation and listing
    path('caregivers/<int:id>/', caregiver_detail, name='caregiver-detail'),  # Handles GET & DELETE
    path('caregivers/<int:id>/update/', caregiver_update, name='caregiver-update'),
    path('caregivers/<int:id>/hire/', caregiver_hire, name='caregiver-hire'),
]
