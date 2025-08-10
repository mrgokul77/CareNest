from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

from .models import Caregiver
from .serializers import CaregiverSerializer

@api_view(['GET', 'POST'])
def caregiver_list(request):
    if request.method == 'GET':
        name = request.query_params.get('name')
        speciality = request.query_params.get('speciality')
        caregivers = Caregiver.objects.all()

        if name:
            caregivers = caregivers.filter(Q(name__icontains=name))
        if speciality:
            caregivers = caregivers.filter(speciality__iexact=speciality)

        serializer = CaregiverSerializer(caregivers, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = CaregiverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def caregiver_detail(request, id):
    try:
        caregiver = Caregiver.objects.get(id=id)
    except Caregiver.DoesNotExist:
        return Response({'error': 'Caregiver not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CaregiverSerializer(caregiver)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        caregiver.delete()
        return Response({'message': 'Caregiver deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def caregiver_update(request, id):
    try:
        caregiver = Caregiver.objects.get(id=id)
    except Caregiver.DoesNotExist:
        return Response({'error': 'Caregiver not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CaregiverSerializer(caregiver, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
