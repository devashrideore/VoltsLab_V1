from django.db.models import Count, Q
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from problems.models import Question
from submissions.models import Submission


class DashboardView(APIView):
    """
    Returns overview stats + per-topic subject mastery for the logged-in user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Global rank by total_points (1-indexed)
        rank = User.objects.filter(total_points__gt=user.total_points).count() + 1

        mastery = []
        for topic_value, topic_label in Question.TOPIC_CHOICES:
            total_in_topic = Question.objects.filter(topic=topic_value).count()
            solved_in_topic = Submission.objects.filter(
                user=user, question__topic=topic_value, is_correct=True
            ).values('question').distinct().count()
            percent = round((solved_in_topic / total_in_topic) * 100, 1) if total_in_topic else 0
            mastery.append({
                'topic': topic_value,
                'topic_display': topic_label,
                'solved': solved_in_topic,
                'total': total_in_topic,
                'percent': percent,
            })

        return Response({
            'solved_count': user.solved_count,
            'attempted_count': user.attempted_count,
            'accuracy': user.accuracy,
            'current_streak': user.current_streak,
            'longest_streak': user.longest_streak,
            'total_points': user.total_points,
            'global_rank': rank,
            'subject_mastery': mastery,
        })


class LeaderboardView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        users = User.objects.filter(attempted_count__gt=0).order_by(
            '-total_points', '-solved_count'
        )[:50]
        data = [
            {
                'rank': idx + 1,
                'username': u.username,
                'solved_count': u.solved_count,
                'accuracy': u.accuracy,
                'total_points': u.total_points,
                'current_streak': u.current_streak,
            }
            for idx, u in enumerate(users)
        ]
        return Response(data)
