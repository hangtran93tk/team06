from django.db import models
# Create your models here.
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models
from authentication.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings 

class MenuInfo(models.Model):
    eng_name = models.CharField(max_length=255, null=True)
    #ひらがなだけ
    kana_name = models.CharField(max_length=255, null=True)
    # 漢字使用
    jp_name = models.CharField(max_length=255, null=True) 
    one_point = models.FloatField()
    two_point = models.FloatField()
    three_point = models.FloatField()
    four_point = models.FloatField()
    kcal = models.FloatField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='infouser', on_delete=models.CASCADE, default=1)
    image = models.ImageField(null=True, upload_to="media/menu")

class UserEat(models.Model):
    EATTIME_CHOICES = (
        (1, '朝食'),
        (2, '昼食'),
        (3, '夕食'),
        (4, '間食'),
    )
    eatTime = models.IntegerField(choices=EATTIME_CHOICES)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='eatuser', on_delete=models.CASCADE)
    menu = models.ForeignKey(MenuInfo, related_name='eatmenu', on_delete=models.CASCADE)

class Foodstuff(models.Model):
    name = models.CharField(max_length=255, null=True) 
    one_point_gram = models.FloatField()
    one_point = models.FloatField()
    two_point = models.FloatField()
    three_point = models.FloatField()
    four_point = models.FloatField()

class MyRecipe(models.Model):
    gram = models.FloatField()
    menu = models.ForeignKey(MenuInfo, related_name='recipemenu', on_delete=models.CASCADE)
    foodstuff = models.ForeignKey(Foodstuff, related_name='recipestuff', on_delete=models.CASCADE)

    