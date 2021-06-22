from django.urls import path
from user.views import ToggleUserFollow, ListUserFollowers, ListFollowing, ListUserView, \
    ListUserFriends, UpdateLoggedInUserProfile, UserSpecificProfile, RemoveFriend


urlpatterns = [
    path('social/followers/toggle-follow/<int:pk>/', ToggleUserFollow.as_view()),
    path('social/followers/followers/', ListUserFollowers.as_view()),
    path('social/followers/following/', ListFollowing.as_view()),
    path('social/friends/', ListUserFriends.as_view()),
    path('users/', ListUserView.as_view()),
    path('users/me/', UpdateLoggedInUserProfile.as_view()),
    path('users/<int:pk>/', UserSpecificProfile.as_view()),
    path('social/friends/remove-friend/<int:pk>/', RemoveFriend.as_view())
]
