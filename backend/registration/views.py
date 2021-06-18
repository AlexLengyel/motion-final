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
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            email = self.request.data['email']
            if User.objects.filter(email__contains=email):
                return Response({'error': 'Email already registered before'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Placeholder for username so that it's not empty (UNIQUE constraint)
                placeholder = f'NewUser{User.objects.latest("id").id + 1}'

                User.objects.create(email=email, username=placeholder)
                new_user = User.objects.latest('id')

                Registration.objects.create(user=new_user)
                verification_code = Registration.objects.latest('id').code

                send_mail(
                    'Your Motion verification code',
                    f'Your verification code is: {verification_code}',
                    DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )

                return Response(status=status.HTTP_200_OK)
        except KeyError:
            return Response({'email': 'this field is required'}, status=status.HTTP_400_BAD_REQUEST)


class RegistrationValidation(UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ValidationSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        email = self.request.data['email']
        code = self.request.data['code']
        password = self.request.data['password']
        password_repeat = self.request.data['password_repeat']
        reg_profile = Registration.objects.get(user__email=email)

        if password != password_repeat or code != reg_profile.code:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            instance = User.objects.get(id=reg_profile.user_id)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(status=status.HTTP_200_OK)

