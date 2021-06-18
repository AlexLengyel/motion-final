from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import Registration
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.core.mail import send_mail

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
                placeholder = User.objects.latest('id').id + 1

                User.objects.create(email=email, username=placeholder)
                new_user = User.objects.latest('id')

                Registration.objects.create(user=new_user)
                verification_code = Registration.objects.latest('id').code_used

                # Here we resend the email with the verification code

                return Response(status=status.HTTP_200_OK)
        except KeyError:
            return Response({'email': 'this field is required'}, status=status.HTTP_400_BAD_REQUEST)
