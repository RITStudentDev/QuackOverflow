from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    custom_user = get_user_model()
    data = request.data

    try:
        user = custom_user.objects.get(username=request.user)
    except custom_user.DoesNotExist:
        return Response({'error':'user does not exist'})
    
    post = Post.objects.create(
        user=user,
        title=request.data  
    )

