from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer

# Create your views here.
@api_view(['GET'])
def get_user_data(request, pk):
    try:
        try:
            user = CustomUser.objects.get(username=pk)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    except:
        return Response({'error':'error retrieving data'}, status=500)

