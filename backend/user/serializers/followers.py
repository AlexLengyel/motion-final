from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class ToggleFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'followers'
        ]


# this is just to be imported in the ListFollowersSerializer and ListFollowingSerializer
class UserFollowStatus(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username'
        ]


class ListFollowersSerializer(serializers.ModelSerializer):
    followers = UserFollowStatus(many=True)

    class Meta:
        model = User
        fields = [
            'followers',
        ]


class ListFollowingSerializer(serializers.ModelSerializer):
    following = UserFollowStatus(many=True)

    class Meta:
        model = User
        fields = [
            'following'
        ]
