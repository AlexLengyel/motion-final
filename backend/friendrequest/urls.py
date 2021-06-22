from django.urls import path
from friendrequest.views import NewFriendRequest, GetAcceptRejectFriendrequest, ListPendingFriendRequests


urlpatterns = [
    path('social/friends/request/<int:pk>/', NewFriendRequest.as_view()),
    path('social/friends/requests/<int:pk>/', GetAcceptRejectFriendrequest.as_view()),
    path('social/friends/requests/', ListPendingFriendRequests.as_view()),
]
