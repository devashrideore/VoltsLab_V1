from datetime import timedelta
from django.utils import timezone
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from problems.models import Question
from .models import Submission
from .serializers import SubmissionCreateSerializer, SubmissionResultSerializer, SubmissionHistorySerializer


class SubmitAnswerView(APIView):
    """
    Evaluates a user's submitted MCQ answer, updates their solved_count,
    streak, accuracy, and points — then returns the full explanation.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = SubmissionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        question_id = serializer.validated_data['question_id']
        selected_option = serializer.validated_data['selected_option']

        try:
            question = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            return Response({'detail': 'Question not found.'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        is_correct = (selected_option == question.correct_option)
        points_awarded = question.points if is_correct else 0

        Submission.objects.create(
            user=user, question=question, selected_option=selected_option,
            is_correct=is_correct, points_awarded=points_awarded,
        )

        user.attempted_count += 1
        if is_correct:
            user.solved_count += 1
            user.total_points += points_awarded

            today = timezone.localdate()
            if user.last_solved_date == today:
                pass  # streak already counted today
            elif user.last_solved_date == today - timedelta(days=1):
                user.current_streak += 1
            else:
                user.current_streak = 1
            user.last_solved_date = today
            user.longest_streak = max(user.longest_streak, user.current_streak)

        user.save()

        result = {
            'is_correct': is_correct,
            'correct_option': question.correct_option,
            'explanation': question.explanation,
            'points_awarded': points_awarded,
            'solved_count': user.solved_count,
            'current_streak': user.current_streak,
            'accuracy': user.accuracy,
            'total_points': user.total_points,
        }
        return Response(SubmissionResultSerializer(result).data)


class MySubmissionHistoryView(generics.ListAPIView):
    serializer_class = SubmissionHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user).select_related('question')
