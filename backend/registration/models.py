import random
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


def code_generator():
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for x in range(5))


class Registration(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, primary_key=True)
    code = models.CharField(max_length=5, default=code_generator)

    def password_reset(self):
        self.code = code_generator()
