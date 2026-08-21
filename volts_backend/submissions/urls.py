from django.urls import path
from .views import SubmitAnswerView, MySubmissionHistoryView

urlpatterns = [
    path('submit/', SubmitAnswerView.as_view(), name='submit-answer'),
    path('history/', MySubmissionHistoryView.as_view(), name='submission-history'),
]
