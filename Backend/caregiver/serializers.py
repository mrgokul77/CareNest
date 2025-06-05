from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Caregiver, UserProfile, HiringRecord

# ✅ Signup Serializer 
class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')  # Extract password
        user = User(**validated_data)  # Create user instance without saving
        user.set_password(password)  # Hash the password
        user.save()  # Save user
        UserProfile.objects.create(user=user)  # Auto-create profile
        return user

# ✅ User Profile Serializer 
class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Show username instead of ID

    class Meta:
        model = UserProfile
        fields = ['user', 'phone', 'address_line1', 'address_line2', 'gender', 'dob', 'profile_pic']

# ✅ User Serializer 
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'profile']

# ✅ Login Serializer 
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

# ✅ Caregiver Serializer 
class CaregiverSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(min_value=20)  
    experience = serializers.IntegerField(min_value=1)  

    class Meta:
        model = Caregiver
        fields = '__all__'
        read_only_fields = ('id', 'created_at')  

# ✅ Hiring Record Serializer (No Changes)
class HiringRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HiringRecord
        fields = '__all__'
        read_only_fields = ('created_at',)
