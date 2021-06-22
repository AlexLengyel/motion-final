from django.urls import path
from .views import ListCreateComment

urlpatterns = [
    path('social/comments/<int:pk>/', ListCreateComment.as_view()),
]
