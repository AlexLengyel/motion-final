from rest_framework import serializers

from post.models import Post
from post.serializers.nested import UserNestedSerializer


class PostsWriteSerializer(serializers.ModelSerializer):
    author = UserNestedSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'images', 'created', 'liked_by', 'author']
        read_only = ['id', 'created', 'updated', 'liked_by', 'author']


class PostsReadSerializer(serializers.ModelSerializer):
    author = UserNestedSerializer()
    number_of_likes = serializers.SerializerMethodField()

    def get_number_of_likes(self, obj):
        return obj.liked_by.count()

    class Meta:
        model = Post
        fields = ['id', 'content', 'images', 'created', 'author', 'liked_by', 'number_of_likes']
        read_only = ['id', 'created', 'updated', 'author', 'liked_by']



