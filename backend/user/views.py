from rest_framework import status, filters
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from django.contrib.auth import get_user_model
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from projectsettings.settings import DEFAULT_FROM_EMAIL
from user.serializers.mainserializer import MainUserSerializer

User = get_user_model()


class ListUserView(ListAPIView):
    queryset = User.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = MainUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']


class ListUserFollowers(ListAPIView):
    serializer_class = MainUserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.followers.all()


class ListFollowing(ListAPIView):
    serializer_class = MainUserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.following.all()


class UpdateLoggedInUserProfile(RetrieveUpdateAPIView):
    serializer_class = MainUserSerializer

    def get_object(self):
        return User.objects.get(id=self.request.user.id)


class UserSpecificProfile(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = MainUserSerializer


class ListUserFriends(ListAPIView):
    serializer_class = MainUserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.friends.all()


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
                html_content = f'<p>{follower.first_name} {follower.last_name} is now following you</p>'
            else:
                html_content = f'<p>{follower.first_name} {follower.last_name} is now following you!</p>\n' \
                               f'<a href="https://krab-motion.propulsion-learn.ch/">' \
                               f'\nClick here to follow {follower.first_name} back!</a>'
            msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()

            return Response({'Success': f'User {user.id} followed'}, status=status.HTTP_200_OK)


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
