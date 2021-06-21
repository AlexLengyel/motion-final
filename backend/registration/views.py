from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from .models import Registration
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.core.mail import send_mail
from projectsettings.settings import DEFAULT_FROM_EMAIL
from .serializers.registration import ValidationSerializer

User = get_user_model()


class RegisterNewUser(CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            email = self.request.data['email']
            if User.objects.filter(email__contains=email):
                return Response({'error': 'Email already registered before'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Placeholder for username so that it's not empty (UNIQUE constraint)
                placeholder = f'NewUser{User.objects.latest("id").id + 1}'
                new_user = User.objects.create(email=email, username=placeholder)
                reg_profile = Registration.objects.create(user=new_user)

                send_mail(
                    'Motion Sign-up',
                    f'Your verification code is: {reg_profile.code}',
                    DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )

                return Response(status=status.HTTP_200_OK)

        except KeyError:
            return Response({'email': 'this field is required'}, status=status.HTTP_400_BAD_REQUEST)


class PasswordReset(CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        email = self.request.data['email']
        # First ensure that the user does have a registration record in our DB
        if Registration.objects.filter(user_id__email=email):
            instance = Registration.objects.get(user_id__email=email)
            # password_reset is a model method that generates a new number in case of password reset
            instance.password_reset()
            instance.save()

            send_mail(
                'Motion Password Reset',
                f'Your verification code is: {instance.code}',
                DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# This works for both new user registration and password reset
class Validation(UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ValidationSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        email = self.request.data['email']
        reg_profile = Registration.objects.get(user_id__email=email)

        # instance definition below matches User profile with Registration profile based on Primary Key
        instance = User.objects.get(id=reg_profile.user_id)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(status=status.HTTP_200_OK)
