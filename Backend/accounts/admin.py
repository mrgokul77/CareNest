from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False

class CustomUserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserProfile)
