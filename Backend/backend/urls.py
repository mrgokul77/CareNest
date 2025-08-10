from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # App-level APIs
    path('api/accounts/', include('accounts.urls')),
    path('api/caregiver/', include('caregiver.urls')),
    path('api/bookings/', include('bookings.urls')),

    # JWT token refresh
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
