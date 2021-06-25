from rest_framework import status, filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from post.models import Post
from post.permissions import IsAuthorOrSuperuserOrReadOnly
from post.serializers.main import PostsWriteSerializer, PostsReadSerializer
from rest_framework.response import Response
from .models import Image


class ListCreatePostsView(ListCreateAPIView):
    """
        post:
        Create a Post

        Body must contain:
        - content (text)

        get:
        List all / searches posts

        Use-case:
        - Base-URL: returns all posts, with optional pagination
            - for pagination, you must include limit and offset parameters in url

        - Search-URL: Searches posts by text-content, as well as first and last name of post author.
            - must include 'search' parameter in url
                - ex: https://krab-motion.propulsion-learn.ch/backend/api/social/posts/?search=apple

        - Combination: Adds pagination and search functionality together
            - ex: https://krab-motion.propulsion-learn.ch/backend/api/social/posts/?search=apple&limit=25&offset=0
    """
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
        try:
            instance = serializer.save(author=self.request.user, shared_from_id=self.request.data['shared_from'])
        except KeyError:
            instance = serializer.save(author=self.request.user)

        for img in self.request.FILES.getlist('images'):
            Image.objects.create(image=img, post=instance)


class RetrieveUpdateDestroyPostsView(RetrieveUpdateDestroyAPIView):
    """
        put:
        Update post information

        - put method is not advised, see patch request

        get:
        Get one post by post ID

        - Post ID must be at end of url

        patch:
        Change Post data

        - Patch is the preferred method for changing data

        delete:
        Delete post of logged in user

        - add post id you wish to delete at end of url
     """
    queryset = Post.objects.all()
    serializer_class = PostsWriteSerializer
    permission_classes = [IsAuthorOrSuperuserOrReadOnly]


class ListFollowingUsersPostView(ListAPIView):
    """
        get:
        Gets logged in user's list of followers

        - Must be logged in to get this information
     """
    serializer_class = PostsReadSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        users = self.request.user.following.all()
        return Post.objects.filter(author__in=users).order_by("-created")


class ListFriendsPostsView(ListAPIView):
    """
        get:
        Gets logged in user's list of friends

        - Must be logged in to get this information
     """
    serializer_class = PostsReadSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        users = self.request.user.friends.all()
        return Post.objects.filter(author__in=users).order_by("-created")


class RetrieveUserPostView(ListAPIView):
    """
        get:
        Gets a list of all posts created by logged in user

        - Returns posts in chronological order, from newest to oldest.
     """
    serializer_class = PostsReadSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.kwargs["pk"]).order_by("-created")


class ToggleLikes(UpdateAPIView):
    """
        patch:
        Toggle logged in users likes on posts

        - Note: Cannot like own posts!
        - patch is preferred method for toggling likes

        put:
        Toggle logged in users likes on posts

        - Put method is not advised, please see patch request
     """
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


class ListUserLikedPostsView(ListAPIView):
    """
        get:
        List all posts the logged in user liked

        - returns chronological list, from newest to oldest
     """
    serializer_class = PostsReadSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        liked = self.request.user.liked_posts.all()
        return Post.objects.filter(id__in=liked).order_by("-created")
