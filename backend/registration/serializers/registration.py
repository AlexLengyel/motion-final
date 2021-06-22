from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from registration.models import Registration

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):

    def validate_password(self, value):
        email = self.initial_data['email']
        reg_code = Registration.objects.get(user_id__email=email).code
        password_repeat = self.initial_data['password_repeat']
        code = self.initial_data['code']

        if value != password_repeat or code != reg_code:
            raise serializers.ValidationError('Passwords not matching or incorrect code')
        else:
            return make_password(value)

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'first_name',
            'last_name',
        ]


class PasswordSerializer(serializers.ModelSerializer):

    def validate_password(self, value):
        email = self.initial_data['email']
        reg_code = Registration.objects.get(user_id__email=email).code
        password_repeat = self.initial_data['password_repeat']
        code = self.initial_data['code']

        if value != password_repeat or code != reg_code:
            raise serializers.ValidationError('Passwords not matching or incorrect code')
        else:
            return make_password(value)

    class Meta:
        model = User
        fields = [
            'email',
            'password',
        ]
