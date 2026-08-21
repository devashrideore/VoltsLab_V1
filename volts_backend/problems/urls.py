from django.urls import path
from .views import QuestionListView, QuestionDetailView, TopicListView

urlpatterns = [
    path('', QuestionListView.as_view(), name='question-list'),
    path('topics/', TopicListView.as_view(), name='topic-list'),
    path('<int:pk>/', QuestionDetailView.as_view(), name='question-detail'),
]
