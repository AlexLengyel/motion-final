from rest_framework.permissions import BasePermission


# only the sender can DELETE the request. The receiver can simply just reject it via PATCH
class FriendRequestPermissions(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user.id == obj.requester.id
        else:
            return request.user.id == obj.receiver.id
