from django.urls import path, re_path
from.views import RegisterView, VerifyEmail, LoginAPIView, IndexView
from rest_framework import permissions

from . import views


urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"), 
    # path('email-verify/<token>/', VerifyEmail.as_view(), name="email-verify"), 
    path('user-weight/', views.CreateUserWeight.as_view(), name="userweight"),
    path('get-goal-weight/', views.GetGoalWeightView.as_view(), name="getgoalweight"),
    path('update-goal-weight/', views.PutGoalWeightView.as_view(), name="updategoalweight"),
    path('update-KcalID/', views.kcalUpdate.as_view(), name="kcalIDUpdate"),
    path('get-GoalKcal/', views.getKcalView.as_view(), name="getKcal"),

]