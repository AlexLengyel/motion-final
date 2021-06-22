from rest_framework import serializers

from comment.models import Comment


class NewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['author', 'post']
