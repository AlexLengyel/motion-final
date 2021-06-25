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
    """
        get:
        Get user data

        - Base URL: Returns list of all users
            - Pagination: add limit and offset parameters to request to enable response pagination

        - Search: Searches for instance of user by username, first and last name, job or email
            - Add search parameter for appropriate response
            - ex: https://krab-motion.propulsion-learn.ch/backend/api/users/?search=waltersobchak@aol.com

        - Combination: Searches for instance of user by search params, with pagination included
            - Add search , offset and limit parameters to enable pagination with search
            - ex: https://krab-motion.propulsion-learn.ch/backend/api/users/?search=waltersobchak@aol.com&offset=0&limit=25
     """
    queryset = User.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = MainUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name', 'last_name', 'job', 'email']

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


class ListUserFollowers(ListAPIView):
    """
       get:
       List all users who follow currently logged in user

       - Must be logged in to use this endpoint!
    """
    serializer_class = MainUserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.followers.all()


class ListFollowing(ListAPIView):
    """
       get:
       List all users currently logged in user is following

       - Must be logged in to use this endpoint!
    """
    serializer_class = MainUserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.following.all()


class UpdateLoggedInUserProfile(RetrieveUpdateAPIView):
    """
       get:
       Get profile of logged in user

       - Must be logged in to use this endpoint!

       put:
       Update Logged in user's profile (full change)

       - Put is not advised, see patch request
       - with put, must include all changeable information

       patch:
       Update Logged in user's profile (partial change)

       - Patch is preferred method for changing user info
       - add any field you wish to change in body of request
    """
    serializer_class = MainUserSerializer

    def get_object(self):
        return User.objects.get(id=self.request.user.id)


class UserSpecificProfile(RetrieveAPIView):
    """
       get:
       Get specific user profile by ID

       - must add id to end of url, with slash afterwards
    """
    queryset = User.objects.all()
    serializer_class = MainUserSerializer


class ListUserFriends(ListAPIView):
    """
       get:
       list all friends of current user

       - can be sued with pagination
    """
    serializer_class = MainUserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return self.request.user.friends.all()


class ToggleUserFollow(UpdateAPIView):
    """
       put:
       toggle follow/unfollow a user

       - put request not advised, use patch instead

       patch:
       toggle follow/unfollow a user

       - patch is the preferred method
    """
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
    """
       put:
       removes user from friend list of logged in user

       - put request is not advised

       patch:
       removes user from friend list of logged in user

       - patch request is the preferred method
    """
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
