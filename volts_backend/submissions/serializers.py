from rest_framework import serializers
from .models import Submission


class SubmissionCreateSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    selected_option = serializers.ChoiceField(choices=['A', 'B', 'C', 'D'])


class SubmissionResultSerializer(serializers.Serializer):
    is_correct = serializers.BooleanField()
    correct_option = serializers.CharField()
    explanation = serializers.CharField()
    points_awarded = serializers.IntegerField()
    solved_count = serializers.IntegerField()
    current_streak = serializers.IntegerField()
    accuracy = serializers.FloatField()
    total_points = serializers.IntegerField()


class SubmissionHistorySerializer(serializers.ModelSerializer):
    question_title = serializers.CharField(source='question.title', read_only=True)
    topic = serializers.CharField(source='question.topic', read_only=True)

    class Meta:
        model = Submission
        fields = ['id', 'question', 'question_title', 'topic', 'selected_option',
                   'is_correct', 'points_awarded', 'created_at']
