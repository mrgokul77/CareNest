from rest_framework import serializers
from .models import Caregiver

class CaregiverSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(min_value=20)
    experience = serializers.IntegerField(min_value=1)

    class Meta:
        model = Caregiver
        fields = '__all__'
        read_only_fields = ('id',)
