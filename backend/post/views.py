from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from post.models import Post
from post.permissions import IsAuthorOrSuperuserOrReadOnly
from post.serializers.main import PostsWriteSerializer, PostsReadSerializer
from rest_framework.response import Response


class ListCreatePostsView(ListCreateAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostsWriteSerializer
        return PostsReadSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RetrieveUpdateDestroyPostsView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsWriteSerializer
    permission_classes = [IsAuthorOrSuperuserOrReadOnly]


class ListFollowingUsersPostView(ListAPIView):
    serializer_class = PostsReadSerializer

    def get_queryset(self):
        users = self.request.user.following.all()
        return Post.objects.filter(author__in=users).order_by("-created")


class RetrieveUserPostView(ListAPIView):
    serializer_class = PostsReadSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.kwargs["pk"]).order_by("-created")


class ToggleLikes(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsReadSerializer

    def patch(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user

        if user.id == post.author.id:
            return Response({'error': 'cannot like own post'}, status=status.HTTP_400_BAD_REQUEST)

        if user in post.liked_by.all():
            post.liked_by.remove(user)
            return Response({'success': f'unliked post {post.id}'}, status=status.HTTP_200_OK)
        else:
            post.liked_by.add(user)
            return Response({'success': f'liked post {post.id}'}, status=status.HTTP_200_OK)


class ListUserLikedPostsView(ListAPIView):
    serializer_class = PostsReadSerializer

    def get_queryset(self):
        liked = self.request.user.liked_posts.all()
        return Post.objects.filter(id__in=liked).order_by("-created")
