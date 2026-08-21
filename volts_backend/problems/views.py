from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Question
from .serializers import QuestionListSerializer, QuestionDetailSerializer


class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['topic', 'problem_type', 'difficulty']


class QuestionDetailView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionDetailSerializer
    permission_classes = [permissions.AllowAny]


class TopicListView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return_data = [{'value': v, 'label': l} for v, l in Question.TOPIC_CHOICES]
        from rest_framework.response import Response
        return Response(return_data)
