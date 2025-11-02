from .views import create_post, get_posts, get_post
from django.urls import path

urlpatterns = [
    path('create_post/', create_post, name='create_post'),
    path('posts/', get_posts, name='get_posts'),
    path('posts/<int:pk>/', get_post, name='get_post')
]