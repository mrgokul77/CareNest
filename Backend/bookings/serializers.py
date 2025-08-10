from rest_framework import serializers
from .models import HiringRecord

class HiringRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HiringRecord
        fields = '__all__'
        read_only_fields = ('created_at',)
