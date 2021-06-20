from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class ToggleFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# this is just to be imported in the ListFollowersSerializer and ListFollowingSerializer
class UserFollowStatus(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ListFollowersSerializer(serializers.ModelSerializer):
    followers = UserFollowStatus(many=True)

    class Meta:
        model = User
        fields = '__all__'


class ListFollowingSerializer(serializers.ModelSerializer):
    following = UserFollowStatus(many=True)

    class Meta:
        model = User
        fields = '__all__'
