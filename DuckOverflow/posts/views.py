from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

Custom_user = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    data = request.data
    user = request.user

    try:
        try:
            user = Custom_user.objects.get(username=request.user)
        except Custom_user.DoesNotExist:
            return Response({'error':'user does not exist'})
        
        post = Post.objects.create(
            user=user,
            title=data.get('title'),
            question=data.get('question'),
            answer=data.get('answer'),
        )

        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)})

