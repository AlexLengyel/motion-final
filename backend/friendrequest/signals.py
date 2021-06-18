from django.dispatch import receiver
from django.contrib.auth import signals
from django.db.models.signals import post_save
from .models import FriendRequest


@receiver(post_save, sender=FriendRequest)
def add_to_friends(sender, instance, created, **kwargs):
    requester = instance.requester
    receiver = instance.receiver
    if instance.status == 'A':
        requester.friends.add(receiver.user)
        receiver.friends.add(requester.user)
        requester.save()
        receiver.save()
    elif instance.status == 'R':
        instance.delete()
