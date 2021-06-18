from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class MainUserSerializer(serializers.ModelSerializer):

    number_of_followers = serializers.SerializerMethodField()
    def get_number_of_followers(self, obj):
        return obj.followers.count()

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'number_of_followers',
            'followers'
        ]

