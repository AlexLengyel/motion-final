from rest_framework import status
from rest_framework.generics import UpdateAPIView, ListAPIView
from userprofile.models import UserProfile
from rest_framework.response import Response
from userprofile.serializers.followers import ToggleFollowSerializer, ListFollowersSerializer, ListFollowingSerializer
from userprofile.serializers.mainserializer import MainUserSerializer, FriendsSerializer


class ToggleUserFollow(UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = MainUserSerializer

    def patch(self, request, *args, **kwargs):
        # This defines the instance that the authenticated user wants to follow
        user = self.get_object()
        # The authenticated user who is making the follow request
        follower = self.request.user.userprofile

        if self.request.user.id == user.user_id:
            return Response({'error': 'You cannot follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
        if follower in user.followers.all():
            user.followers.remove(follower)
            return Response({'Success': f'User {user.user_id} unfollowed'}, status=status.HTTP_200_OK)
        else:
            user.followers.add(follower)
            return Response({'Success': f'User {user.user_id} followed'}, status=status.HTTP_200_OK)


class ListUserFriends(ListAPIView):
    serializer_class = FriendsSerializer

    def list(self, request, *args, **kwargs):
        instance = UserProfile.objects.get(user_id=self.request.user.id)
        return Response(self.get_serializer(instance).data)


class ListUserFollowers(ListAPIView):
    serializer_class = ListFollowersSerializer

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.get(user_id=self.request.user.id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class ListFollowingUser(ListAPIView):
    serializer_class = ListFollowingSerializer

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.get(user_id=self.request.user.id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class ListUserView(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = MainUserSerializer

