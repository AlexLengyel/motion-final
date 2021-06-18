from rest_framework import serializers

from post.models import Post
from user.models import User


class UserNestedSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class ToggleLikesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'liked_by']
        read_only = ['id']
