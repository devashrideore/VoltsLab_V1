from rest_framework import serializers
from .models import Question


class QuestionListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for the problems list — no answer leakage."""
    topic_display = serializers.CharField(source='get_topic_display', read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'topic', 'topic_display', 'problem_type',
                   'difficulty', 'points']


class QuestionDetailSerializer(serializers.ModelSerializer):
    """Detail serializer used in the workspace — excludes correct_option/explanation
    until the user submits an answer (handled in the view)."""
    topic_display = serializers.CharField(source='get_topic_display', read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'topic', 'topic_display', 'problem_type', 'difficulty',
                   'question_text', 'given_values', 'option_a', 'option_b',
                   'option_c', 'option_d', 'formula_hint', 'points']
