from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class MainUserSerializer(serializers.ModelSerializer):

    number_of_followers = serializers.SerializerMethodField()

    def get_number_of_followers(self, obj):
        return obj.followers.count()

    class Meta:
        model = User
        fields = '__all__'


class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'friends'
        ]


class RetrieveUpdateUserProfileSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField(read_only=True)
    likes_count = serializers.SerializerMethodField(read_only=True)
    friends_count = serializers.SerializerMethodField(read_only=True)
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)

    def get_posts_count(self, obj):
        return obj.user_posts.count()

    def get_likes_count(self, obj):
        return obj.liked_posts.count()

    def get_friends_count(self, obj):
        return obj.friends.count()

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "about",
            "job",
            "phone_number",
            "location",
            "hobbies",
            "posts_count",
            "likes_count",
            "friends_count",
            "followers_count",
            "following_count",
            "user_posts",
            "liked_posts",
            "friends",
            "followers",
            "following",
            "groups",
            "last_login",
            "date_joined"
        ]
        read_only_fields = [
            "id",
            "posts_count",
            "likes_count",
            "friends_count",
            "followers_count",
            "following_count",
            "user_posts",
            "liked_posts",
            "friends",
            "followers",
            "following",
            "groups",
            "last_login",
            "date_joined"
        ]
