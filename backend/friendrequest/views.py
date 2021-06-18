from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, ListAPIView
from rest_framework import status
from friendrequest.serializers.friendrequests import FriendRequestSerializer, AcceptRejectSerializer
from friendrequest.models import FriendRequest
from friendrequest.permissions import IsRequester, IsReceiver
from userprofile.models import UserProfile


class NewFriendRequest(CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def perform_create(self, serializer):
        requester = self.request.user.userprofile
        receiver = UserProfile.objects.get(user_id=self.kwargs['pk'])
        # Prevents user from adding himself or adding someone they're already friends with
        if self.request.user.id == self.kwargs['pk'] or receiver in self.request.user.friends.all():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save(requester=requester, receiver=receiver)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# can only be done by the requester
class CancelFriendRequest(DestroyAPIView):
    queryset = FriendRequest.objects.all()
    permission_classes = [IsRequester]


class AcceptRejectFriendRequest(UpdateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = AcceptRejectSerializer
    permission_classes = [IsReceiver]


class ListPendingFriendRequests(ListAPIView):
    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(receiver=self.request.user.id)

