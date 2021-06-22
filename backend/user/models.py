from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


def user_directory_path(instance, filename):
    return f'{instance.username}/{filename}'


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)
    about = models.TextField(max_length=500, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'. "
                                         "From 9 up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    location = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    banner = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    hobbies = models.JSONField(blank=True, default=list)
    following = models.ManyToManyField('self', blank=True, related_name='followers', symmetrical=False)
    friends = models.ManyToManyField('self', related_name='friends', blank=True)
    job = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.username
