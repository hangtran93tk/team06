from django.db import models

# Create your models here.
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models

from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings


class kcalInfo(models.Model):
    class Meta:
        db_table = 'kcalInfo'
    
    active_level = models.IntegerField()
    SEX_CHOICES = (
        (1, '男'),
        (2, '女'),
    )
    sex = models.IntegerField(choices=SEX_CHOICES)
    age = models.IntegerField()
    one_point = models.FloatField()
    two_point = models.FloatField()
    three_point = models.FloatField()
    four_point = models.FloatField()
    kcal = models.FloatField()

    def __str__(self):
        return  str(self.kcal)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if email is None:
            raise TypeError('Users should have a Email')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        extra_fields.setdefault('is_verified', False)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if password is None:
            raise TypeError('Password should not be none')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.create_user(email, password, **extra_fields)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True, db_index=True)
    username = models.CharField(max_length=255, db_index=True) 
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    height = models.FloatField()
    goal_weight = models.FloatField()
    SEX_CHOICES = (
        (1, '男'),
        (2, '女'),
    )
    sex = models.IntegerField(choices=SEX_CHOICES)
    birthday = models.DateField()
    ACTIVE_CHOICES = (
        (1, '運動レベル1'),
        (2, '運動レベル2'),
        (3, '運動レベル3'),
    )
    active_level = models.IntegerField(choices=ACTIVE_CHOICES, default=3)
    
    kcal = models.ForeignKey(to=kcalInfo, on_delete=models.CASCADE, default=1)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

# ここから体重履歴表djangoの特性上主キーなしの表は作成することはできない
class UserWeight(models.Model):
    class Meta:
        db_table = 'user_weight'
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    weight = models.FloatField()

    def __str__(self):
        return self.weight



