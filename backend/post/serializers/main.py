from rest_framework import serializers
from post.models import Post
from post.models import Image


#  Used in any action requiring rewriting post content
from user.serializers.mainserializer import MainUserSerializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']


class PostsWriteSerializer(serializers.ModelSerializer):
    author = MainUserSerializer(read_only=True)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'images', 'created', 'liked_by', 'author']
        read_only = ['id', 'created', 'updated', 'liked_by', 'author', 'images']


#  Used in any action requiring the reading of post content
class PostsReadSerializer(serializers.ModelSerializer):
    author = MainUserSerializer()
    amount_of_comments = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    is_from_logged_in_user = serializers.SerializerMethodField()
    logged_in_user_liked = serializers.SerializerMethodField()

    def get_amount_of_comments(self, obj):
        return obj.comment_set.count()

    def get_amount_of_likes(self, obj):
        return obj.liked_by.count()

    def get_is_from_logged_in_user(self, obj):
        return self.context["request"].user == obj.author

    def get_logged_in_user_liked(self, obj):
        return self.context["request"].user.id in obj.liked_by.core_filters

    class Meta:
        model = Post
        fields = '__all__'
        read_only = ['id', 'created', 'updated', 'author', 'liked_by']