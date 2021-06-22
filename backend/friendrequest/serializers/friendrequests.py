from rest_framework import serializers
from friendrequest.models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
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
