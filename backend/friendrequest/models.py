from django.db import models
from django.contrib.auth import get_user_model
from userprofile.models import UserProfile

User = get_user_model()


class FriendRequest(models.Model):
    requester = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE, related_name='requester')
    receiver = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=10, choices=[('P', 'Pending'), ('A', 'Accepted'), ('R', 'Rejected')],
                              default='P')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Request #{self.id}, sent from {self.requester} to {self.receiver}. Status: {self.status}'
