from django.urls import path
from django.views import View
from .views import RegisterNewUser, PasswordReset, Validation

urlpatterns = [
    path('auth/registration/', RegisterNewUser.as_view()),
    path('auth/password-reset/', PasswordReset.as_view()),
    path('auth/registration/validation/', Validation.as_view()),
    path('auth/password-reset/validation/', Validation.as_view())
]
