from django.contrib import admin
from .models import Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['title', 'topic', 'problem_type', 'difficulty', 'points']
    list_filter = ['topic', 'problem_type', 'difficulty']
    search_fields = ['title', 'question_text']
