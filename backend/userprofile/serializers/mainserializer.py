from rest_framework import serializers
from userprofile.models import UserProfile


class MainUserSerializer(serializers.ModelSerializer):

    number_of_followers = serializers.SerializerMethodField()

    def get_number_of_followers(self, obj):
        return obj.followers.count()

    class Meta:
        model = UserProfile
        fields = '__all__'


class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'friends'
        ]
