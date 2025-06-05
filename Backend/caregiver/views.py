from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from .serializers import SignUpSerializer, LoginSerializer, CaregiverSerializer, UserProfileSerializer, HiringRecordSerializer
from .models import Caregiver, HiringRecord

# ✅ Signup API
@api_view(['POST'])
def signup(request):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Login API
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        if not User.objects.filter(username=username).exists():
            return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return Response({
                'message': 'Login successful',
                'user': {'id': user.id, 'username': user.username, 'email': user.email}
            }, status=status.HTTP_200_OK)

        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Logout API
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):  
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# ✅ User Profile API (GET, PUT)
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    if request.method == 'GET':
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Caregiver List API (GET, POST)
@api_view(['GET', 'POST'])
def caregiver_list(request):
    if request.method == 'GET':
        name = request.query_params.get('name', None)
        speciality = request.query_params.get('speciality', None)
        
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

# ✅ Caregiver Detail API (GET, DELETE)
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

# ✅ Caregiver Update API (PUT)
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

@api_view(['POST'])
def caregiver_hire(request, id):
    try:
        caregiver = Caregiver.objects.get(id=id)
        if not caregiver.availability:
            return Response(
                {"error": "Caregiver is not available for hire"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create hiring record
        hiring_data = {
            'caregiver': caregiver.id,
            **request.data
        }
        hiring_serializer = HiringRecordSerializer(data=hiring_data)
        if hiring_serializer.is_valid():
            hiring_serializer.save()
            
            # Update caregiver availability
            caregiver.availability = False
            caregiver.save()
            
            return Response(hiring_serializer.data, status=status.HTTP_201_CREATED)
        return Response(hiring_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Caregiver.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def caregiver_delete(request, id):
    try:
        caregiver = Caregiver.objects.get(id=id)
        caregiver.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Caregiver.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
