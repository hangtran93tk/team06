from django.urls import path, re_path
from .views import getMenuInfoView
from rest_framework import permissions

from . import views

urlpatterns = [
    path('get-MenuInfo/', views.getMenuInfoView.as_view(), name="getMenuInfo"),
]