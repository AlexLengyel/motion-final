from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from friendrequest.serializers.friendrequests import FriendRequestSerializer, AcceptRejectSerializer
from friendrequest.models import FriendRequest
from friendrequest.permissions import FriendRequestPermissions
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.core.mail import EmailMultiAlternatives
from projectsettings.settings import DEFAULT_FROM_EMAIL

User = get_user_model()


class NewFriendRequest(CreateAPIView):
    """
    Create a friend request

    Send a friend request. provide recipient ID in URL.
    Body can be left empty
    """
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def create(self, request, *args, **kwargs):
        requester = self.request.user
        receiver = User.objects.get(id=self.kwargs['pk'])

        # User cannot add himself or duplicate same request
        if requester.id == self.kwargs['pk']:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # to remove a friend
        elif receiver in requester.friends.all():
            requester.friends.remove(receiver)
            return Response(status=status.HTTP_201_CREATED)

        # in case two users add eachother at the same time, change status of first request to "Accepted"
        # instead of creating two requests between same users
        elif FriendRequest.objects.filter(requester=receiver, receiver=requester):
            instance = FriendRequest.objects.get(requester=receiver, receiver=requester)
            instance.status = "A"
            instance.save()
            return Response(status=status.HTTP_201_CREATED)

        # if user wants to send a request to someone who rejected their request before
        # updated status of rejected request to "Pending" once more
        elif FriendRequest.objects.filter(requester=requester, receiver=receiver):
            instance = FriendRequest.objects.get(requester=requester, receiver=receiver)
            instance.status = "P"
            instance.save()
            return Response(status=status.HTTP_201_CREATED)

        # if none of the above conditions applies, create a new request from scratch
        else:
            serializer = self.get_serializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(requester=requester, receiver=receiver)

            subject, from_email, to = f'{requester.first_name} {requester.last_name} wants to be your friend!',\
                                      DEFAULT_FROM_EMAIL, receiver.email
            html_content = f'<p>You have a new friend request from {requester.first_name} {requester.last_name}.\n' \
                           f'<a href="https://krab-motion.propulsion-learn.ch/"> Click here to respond!</a>'
            msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetAcceptRejectFriendrequest(RetrieveUpdateDestroyAPIView):
    """
    patch:
    Accept or reject a friend request

    Request ID must be passed in the URL. Body must contain status "R" or "A"

    delete:
    Cancel a friend request

    This only works for the sender of the friend request. Request ID to be passed in URL.
    Nothing to add in body
    """
    queryset = FriendRequest.objects.all()
    serializer_class = AcceptRejectSerializer
    permission_classes = [FriendRequestPermissions]


# list requests that are pending approval or rejection
class ListPendingFriendRequests(ListAPIView):
    """
    Retrieve friend requests

    This view returns all friend requests in which the logged in user is involved, be it as a sender or a recipient.
    Frontend Dev. can map the response accordingly.
    """
    serializer_class = FriendRequestSerializer
    """
    This view will return all requests that the logged in user is involved in
    both as a sender and a receiver. The frontend developer will route the response
    based on sender/receiver status. This is more efficient than writing two views
    for sent and received requests
    """
    def get_queryset(self):
        user = self.request.user.id
        return FriendRequest.objects.filter(Q(receiver=user) | Q(requester=user), status="P")
