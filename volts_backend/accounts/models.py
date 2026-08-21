from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model tracking Volts Lab profile stats."""
    bio = models.CharField(max_length=255, blank=True, default='')
    avatar_seed = models.CharField(max_length=50, blank=True, default='volt')

    solved_count = models.PositiveIntegerField(default=0)
    attempted_count = models.PositiveIntegerField(default=0)
    current_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    last_solved_date = models.DateField(null=True, blank=True)
    total_points = models.PositiveIntegerField(default=0)

    @property
    def accuracy(self):
        if self.attempted_count == 0:
            return 0.0
        return round((self.solved_count / self.attempted_count) * 100, 2)

    def __str__(self):
        return self.username
