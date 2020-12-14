from django.db import models
# Create your models here.
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

# class menuInfo(models.Model):
#     onePoint =
#     twoPoint =
#     treePoint =
#     fourPoint = 
#     kcal =
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.CASCADE)

# class UserEat(models.Model):
#     eatTime = models.IntegerField()
#     date = models.DateField(auto_now_add=True)
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.CASCADE)