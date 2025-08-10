from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from caregiver.models import Caregiver
from .serializers import HiringRecordSerializer

@api_view(['POST'])
def caregiver_hire(request, id):
    try:
        caregiver = Caregiver.objects.get(id=id)
        if not caregiver.availability:
            return Response({"error": "Caregiver is not available for hire"}, status=status.HTTP_400_BAD_REQUEST)

        hiring_data = {
            'caregiver': caregiver.id,
            **request.data
        }
        hiring_serializer = HiringRecordSerializer(data=hiring_data)
        if hiring_serializer.is_valid():
            hiring_serializer.save()
            caregiver.availability = False
            caregiver.save()
            return Response(hiring_serializer.data, status=status.HTTP_201_CREATED)
        return Response(hiring_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Caregiver.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
