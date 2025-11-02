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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts(request):

    try:
        user = Custom_user.objects.get(username=request.user.username)
    except Custom_user.DoesNotExist:
        return Response({'error':'user does not exist'})
    
    posts = Post.objects.all().order_by('time_created')
    
    paginator = PageNumberPagination()
    paginator.page_size = 16
    compiled_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(compiled_page,many=True)

    data = []

    for post in serializer.data:
        new_post = {**post}
        data.append(new_post)



    return paginator.get_paginated_response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request):
    try:
        try:
            post = Post.objects.get(id=request.data['id'])
        except Post.DoesNotExist:
            return Response({'error': 'post does not exist'})
        
        try:
            user = Custom_user.objects.get(username=request.data['username'])
        except Custom_user.DoesNotExist:
            return Response({'error':'user does not exist'})
        
        if user in post.likes.add():
            post.likes.remove(user)
            return Response({'now_liked': False})
        else:
            post.likes.add(user)
            return Response({'now_liked':True})
    except:
        return Response({'error': 'failed to like post'})
