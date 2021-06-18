from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, primary_key=True)
    about = models.TextField(max_length=500, blank=True)
    following = models.ManyToManyField('self', blank=True, related_name='followers', symmetrical=False)
    friends = models.ManyToManyField(to=User, related_name='friends', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user}'
