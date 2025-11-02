from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    question = models.TextField()
    answer = models.TextField(blank=True)
    likes = models.ManyToManyField(CustomUser, related_name='liked_posts', blank=True)
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comments')  # <-- changed
    text = models.TextField()
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.title}"
