from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

Custom_user = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    try:
        user = request.user

        # Create the post
        post = Post.objects.create(
            user=user,
            title=request.data.get('title'),
            question=request.data.get('question'),
            answer=request.data.get('answer'),
        )

        serializer = PostSerializer(post)
        return Response(serializer.data, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts(request):
    """
    Returns all posts with pagination.
    """
    posts = Post.objects.all().order_by('-time_created') 

    paginator = PageNumberPagination()
    paginator.page_size = 16
    page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post(request, pk):

    try:
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request):

    try:
        post_id = request.data.get('id')
        post = Post.objects.get(id=post_id)
        user = request.user

        # Toggle like
        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'now_liked': False})
        else:
            post.likes.add(user)
            return Response({'now_liked': True})

    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
