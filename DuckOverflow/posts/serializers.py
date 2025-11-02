from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['username', 'title', 'formatted_date', 'question', 'answer', 'likes', 'like_count']

    def get_username(self, obj):
        return obj.user.username
    
    def get_like_count(self, obj):
        return obj.likes.count()
    def get_formatted_time(self, obj):
        return obj.time_created.strftime("%d %b %y")
