from django.urls import path
from django.views import View
from .views import RegisterNewUser

urlpatterns = [
    path('auth/registration/', RegisterNewUser.as_view())
]