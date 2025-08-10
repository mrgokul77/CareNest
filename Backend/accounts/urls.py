from django.urls import path
from .views import (
    signup, logout_user, user_profile, CustomTokenObtainPairView
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('logout/', logout_user, name='logout'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', user_profile, name='user-profile'),
]
