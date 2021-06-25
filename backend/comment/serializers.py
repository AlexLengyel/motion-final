from rest_framework import serializers
from comment.models import Comment
from user.serializers.mainserializer import MainUserSerializer


class NewCommentSerializer(serializers.ModelSerializer):
    author = MainUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'text',
            'images',
            'created',
            'edited'
        ]
        read_only_fields = ['author', 'post']
