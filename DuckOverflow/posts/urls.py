from .views import create_post, get_posts
from django.urls import path

urlpatterns = [
    path('create_post/', create_post, name='create_post'),
    path('posts/', get_posts, name='get_posts'),
]