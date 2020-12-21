
from rest_framework import serializers
from .models import User, UserWeight, kcalInfo
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
import datetime


class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model=User
        fields = ['email', 'username', 'password', 'height', 'goal_weight', 'sex', 'birthday', 'active_level']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
        token=serializers.CharField(max_length=555)

        class Meta:
            model = User
            fields = ['token']

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255, min_length=3)
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)
    username = serializers.CharField(
        max_length=255, min_length=3, read_only=True)
    # tokens = serializers.CharField(max_length=68, min_length=6, read_only=True)
    tokens = serializers.SerializerMethodField()
    
    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }


    class Meta:
        model=User
        fields=['email', 'password', 'username', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        # filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)

        # if filtered_user_by_email.exists() and filtered_user_by_email[0].auth_provider != 'email':
        #     raise AuthenticationFailed(
        #         detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

        if not user:
            raise AuthenticationFailed('["メールアドレスまたはパスワードが違う。/登録されていないユーザーです。"]' )
        if not user.is_active:
            raise AuthenticationFailed('アカウントが停止されています。管理者にお問い合わせください。')
        if not user.is_verified:
            raise AuthenticationFailed('Emailの認証がされていません。')

        return {
            'email': user.email,
            'password': user.password,
            'username': user.username,
            'tokens': user.tokens

        }

        return super().validate(attrs)

class UserWeightSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserWeight
        # fields = ['date', 'weight', 'user_id']
        fields = ['date','weight','user_id']
    def create(self, validated_data):
        test, created = UserWeight.objects.update_or_create(
            date=datetime.date.today(),user_id=self.context['request'].user.id,
            defaults={'weight': validated_data.get('weight')}
        )
        return test

class GoalWeightSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['goal_weight']
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.save()
        return instance
        # answer, created = UserWeight.objects.update_or_create(
        # question=validated_data.get('question', None),
        # defaults={'answer': validated_data.get('answer', None)})
    # return created

class getKcalSerializer(serializers.ModelSerializer):
    class Meta:
        model=kcalInfo
        fields = ['kcal', 'id']


