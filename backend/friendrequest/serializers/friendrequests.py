from rest_framework import serializers
from friendrequest.models import FriendRequest

from user.serializers.mainserializer import MainUserSerializer


class FriendRequestSerializer(serializers.ModelSerializer):
    requester = MainUserSerializer(read_only=True)
    receiver = MainUserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = [
            'id',
            'requester',
            'receiver',
            'status',
        ]
        read_only_fields = [
            'requester',
            'receiver'
        ]


class AcceptRejectSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
        read_only_fields = [
            'requester',
            'receiver'
        ]
