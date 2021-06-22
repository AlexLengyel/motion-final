from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


# this is just to be imported in the ListFollowersSerializer and ListFollowingSerializer
class NestedUserSerializer(serializers.ModelSerializer):
    followed_by_me = serializers.SerializerMethodField()
    is_my_friend = serializers.SerializerMethodField()

    def get_followed_by_me(self, obj):
        return obj in self.context['request'].user.following.all()

    def get_is_my_friend(self, obj):
        return obj in self.context['request'].user.friends.all()

    class Meta:
        model = User
        fields = [
            'id',
            'about',
            'username',
            'first_name',
            'last_name',
            'location',
            'hobbies',
            'followed_by_me',
            'is_my_friend'
        ]


class ListFollowersSerializer(serializers.ModelSerializer):
    followers = NestedUserSerializer(many=True)

    class Meta:
        model = User
        fields = ['followers']


class ListFollowingSerializer(serializers.ModelSerializer):
    following = NestedUserSerializer(many=True)

    class Meta:
        model = User
        fields = ['following']


class ListFriendsSerializer(serializers.ModelSerializer):
    friends = NestedUserSerializer(many=True)

    class Meta:
        model = User
        fields = ['friends']
