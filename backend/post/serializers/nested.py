from rest_framework import serializers
from post.models import Post


class ToggleLikesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'liked_by']
        read_only = ['id']

