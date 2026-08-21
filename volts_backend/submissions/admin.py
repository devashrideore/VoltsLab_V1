from django.contrib import admin
from .models import Submission


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ['user', 'question', 'selected_option', 'is_correct', 'points_awarded', 'created_at']
    list_filter = ['is_correct']
