from rest_framework import status, filters
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from user.serializers.followers import ListFollowersSerializer, ListFollowingSerializer, ListFriendsSerializer, \
    NestedUserSerializer
from user.serializers.mainserializer import MainUserSerializer, FriendsSerializer, RetrieveUpdateUserProfileSerializer
from django.core.mail import EmailMultiAlternatives
from projectsettings.settings import DEFAULT_FROM_EMAIL

User = get_user_model()


class ToggleUserFollow(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = MainUserSerializer

    def patch(self, request, *args, **kwargs):
        # This defines the instance that the authenticated user wants to follow
        user = self.get_object()
        # The authenticated user who is making the follow request
        follower = self.request.user

        if self.request.user.id == user.id:
            return Response({'error': 'You cannot follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
        if follower in user.followers.all():
            user.followers.remove(follower)
            return Response({'Success': f'User {user.id} unfollowed'}, status=status.HTTP_200_OK)
        else:
            user.followers.add(follower)

            subject, from_email, to = 'You have a new follower!', DEFAULT_FROM_EMAIL, user.email
            if follower in user.following.all():
                html_content = f'<p>{follower.first_name} {follower.last_name} is now following you'
            else:
                html_content = f'<p>{follower.first_name} {follower.last_name} is now following you!\n' \
                               f'<a href="https://krab-motion.propulsion-learn.ch/">' \
                               f'\nClick here to follow {follower.first_name} back!</a>'
            msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
            msg.send()

            return Response({'Success': f'User {user.id} followed'}, status=status.HTTP_200_OK)


class ListUserFriends(ListAPIView):
    serializer_class = ListFriendsSerializer

    def list(self, request, *args, **kwargs):
        instance = User.objects.get(id=self.request.user.id)
        return Response(self.get_serializer(instance).data)


class ListUserFollowers(ListAPIView):
    serializer_class = ListFollowersSerializer

    def list(self, request, *args, **kwargs):
        queryset = User.objects.get(id=self.request.user.id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class ListFollowing(ListAPIView):
    serializer_class = ListFollowingSerializer

    def list(self, request, *args, **kwargs):
        queryset = User.objects.get(id=self.request.user.id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class ListUserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = NestedUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']


class UpdateLoggedInUserProfile(RetrieveUpdateAPIView):
    serializer_class = RetrieveUpdateUserProfileSerializer

    def get_object(self):
        return User.objects.get(id=self.request.user.id)


class UserSpecificProfile(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = MainUserSerializer


class RemoveFriend(UpdateAPIView):
    def update(self, request, *args, **kwargs):
        user_id = self.request.user.id
        friend = self.kwargs['pk']

        # basic logic to avoid unexepcted accidents - user can't unfriend themselves
        if user_id == friend:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # User can't unfriend someone they're not friends with
        elif friend not in User.objects.get(id=user_id).friends.all():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            instance = User.objects.get(id=user_id)
            instance.friends.remove(friend)
            return Response(status=status.HTTP_200_OK)
