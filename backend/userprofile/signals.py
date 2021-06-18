from django.dispatch import receiver
from django.contrib.auth import signals
from django.db.models.signals import post_save
from .models import UserProfile
from user.models import User


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    profile, created = UserProfile.objects.get_or_create(user=instance)
    if created:
        profile.save()



