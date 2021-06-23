from django.db.models import Q
from rest_framework import status, filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from post.models import Post
from post.permissions import IsAuthorOrSuperuserOrReadOnly
from post.serializers.main import PostsWriteSerializer, PostsReadSerializer
from rest_framework.response import Response
from .models import Image


# List all posts, create a post
class ListCreatePostsView(ListCreateAPIView):
    pagination_class = LimitOffsetPagination
    queryset = Post.objects.all().order_by('-created')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['content', 'author__first_name', 'author__last_name']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostsWriteSerializer
        return PostsReadSerializer

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)
        for img in self.request.FILES.getlist('images'):
            Image.objects.create(image=img, post=instance)


# Read update or delete one post instance
class RetrieveUpdateDestroyPostsView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsWriteSerializer
    permission_classes = [IsAuthorOrSuperuserOrReadOnly]


# List posts from users the logged in user is following
class ListFollowingUsersPostView(ListAPIView):
    serializer_class = PostsReadSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        users = self.request.user.following.all()
        return Post.objects.filter(author__in=users).order_by("-created")


# List posts from friends of logged in user
class ListFriendsPostsView(ListAPIView):
    serializer_class = PostsReadSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        users = self.request.user.friends.all()
        return Post.objects.filter(author__in=users).order_by("-created")


# Retrieve one of logged in user's posts
class RetrieveUserPostView(ListAPIView):
    serializer_class = PostsReadSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.kwargs["pk"]).order_by("-created")


# Toggle logged in user's likes on posts
class ToggleLikes(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsReadSerializer

    def patch(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user

        if user.id == post.author.id:
            return Response({'error': 'cannot like own post'},
                            status=status.HTTP_400_BAD_REQUEST)

        if user in post.liked_by.all():
            post.liked_by.remove(user)
            return Response({'success': f'unliked post {post.id}'}, status=status.HTTP_200_OK)
        else:
            post.liked_by.add(user)
            return Response({'success': f'liked post {post.id}'}, status=status.HTTP_200_OK)


# List all posts the logged in user liked
class ListUserLikedPostsView(ListAPIView):
    serializer_class = PostsReadSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        liked = self.request.user.liked_posts.all()
        return Post.objects.filter(id__in=liked).order_by("-created")


