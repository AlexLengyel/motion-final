from rest_framework import serializers
from django.contrib.auth import get_user_model
from friendrequest.models import FriendRequest

User = get_user_model()


class MainUserSerializer(serializers.ModelSerializer):
    logged_in_user_is_following = serializers.SerializerMethodField(read_only=True)
    logged_in_user_is_friends = serializers.SerializerMethodField(read_only=True)
    logged_in_user_is_rejected = serializers.SerializerMethodField(read_only=True)
    logged_in_user_received_fr = serializers.SerializerMethodField(read_only=True)
    amount_of_posts = serializers.SerializerMethodField(read_only=True)
    amount_of_likes = serializers.SerializerMethodField(read_only=True)
    amount_of_friends = serializers.SerializerMethodField(read_only=True)
    amount_of_followers = serializers.SerializerMethodField(read_only=True)
    amount_of_following = serializers.SerializerMethodField(read_only=True)

    def get_logged_in_user_is_following(self, obj):
        return self.context['request'].user in obj.followers.all()

    def get_logged_in_user_is_friends(self, obj):
        return self.context['request'].user in obj.friends.all()

    def get_logged_in_user_is_rejected(self, obj):
        return len(FriendRequest.objects.filter(
            receiver=obj, requester=self.context['request'].user, status='R')) > 0

    def get_logged_in_user_received_fr(self, obj):
        return len(FriendRequest.objects.filter(
            receiver=obj, requester=self.context['request'].user, status='P')) > 0

    def get_amount_of_posts(self, obj):
        return obj.user_posts.count()

    def get_amount_of_likes(self, obj):
        return obj.liked_posts.count()

    def get_amount_of_friends(self, obj):
        return obj.friends.count()

    def get_amount_of_followers(self, obj):
        return obj.followers.count()

    def get_amount_of_following(self, obj):
        return obj.following.count()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'job', 'avatar',
                  'banner', 'location', 'about', 'hobbies', 'logged_in_user_is_following',
                  'logged_in_user_is_friends', 'logged_in_user_is_rejected',
                  'logged_in_user_received_fr', 'amount_of_posts', 'amount_of_likes',
                  'amount_of_friends', 'amount_of_followers', 'amount_of_following']
        read_only_fields = ['id', 'logged_in_user_is_following',
                            'logged_in_user_is_friends', 'logged_in_user_is_rejected',
                            'logged_in_user_received_fr', 'amount_of_posts', 'amount_of_likes',
                            'amount_of_friends', 'amount_of_followers', 'amount_of_following']
