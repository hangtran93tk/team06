from rest_framework import serializers
from .models import Foodstuff, MenuInfo, MyRecipe, UserEat
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
import datetime

# 食事の４群点数とカロリーを取るためのシリアライザ
class GetMenuInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=MenuInfo
        fields = ['kcal']