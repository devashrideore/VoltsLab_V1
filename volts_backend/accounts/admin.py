from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class VoltsUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'solved_count', 'current_streak', 'total_points']
    fieldsets = UserAdmin.fieldsets + (
        ('Volts Lab Stats', {
            'fields': ('bio', 'avatar_seed', 'solved_count', 'attempted_count',
                       'current_streak', 'longest_streak', 'last_solved_date', 'total_points')
        }),
    )
