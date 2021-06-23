from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


def post_directory_path(instance, filename):
    return f'user_{instance.post.author.id}/{instance.post.id}/{filename}'


class Post(models.Model):
    content = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(to=User, related_name="user_posts", on_delete=models.CASCADE)
    liked_by = models.ManyToManyField(to=User, blank=True, related_name="liked_posts")

    def __str__(self):
        return f"Post: {self.id}, Author: {self.author}"


class Image(models.Model):
    image = models.ImageField(upload_to=post_directory_path, blank=True, null=True)
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return f"Image #{self.id} on {self.post}"
