from django.shortcuts import render

from rest_framework import generics, status, views, permissions, viewsets, mixins
from .serializers import RegisterSerializer, EmailVerificationSerializer, LoginSerializer, UserWeightSerializer, GoalWeightSerializer, getKcalSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserWeight, kcalInfo
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .permissions import IsOwner
from .renderers import UserRenderer
from django_filters import rest_framework as filters
# Create your views here.

from django.views.generic import TemplateView
# import datetime
from datetime import timedelta, date
from dateutil.relativedelta import relativedelta
from django.db import connection, transaction

from django.conf import settings

class IndexView(TemplateView):
    template_name = 'index.html'

class RegisterView(generics.GenericAPIView):

    serializer_class=RegisterSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request):
        user = request.data
        if User.objects.filter(email=request.data.get("email"), is_verified=False).exists():
            test = User.objects.filter(email=request.data.get("email"), is_verified=False)
            test.delete()
        
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        user=User.objects.get(email=user_data['email'])
        token=RefreshToken.for_user(user).access_token
        current_site=get_current_site(request).domain
        relativeLink=reverse('email-verify')
        
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = user.username + \
            ' 様ご登録ありがとうございます以下のリンクをクリックして登録を完了してください \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': '卒業制作メール送信テスト'}


        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)

class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    renderer_classes = (UserRenderer,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# generics.〜　の使い方は　くろのて　さんのブログがわかりやすく解説されている views.APIView
class UserWeightFilter(filters.FilterSet):
    # 体重グラフ表示データ取得するためのフィルタ
    selectNumber = filters.NumberFilter(method="get_date_filter")
    def get_date_filter(self, queryset, name, value):
        d = date.today()
        # dt = d - timedelta(days=7)
        if 'selectNumber' in self.request.GET:
            result = self.request.GET['selectNumber']
            if int(result) == 2 :
                dt = d + relativedelta(months=-1)
            elif int(result) == 3 :
                dt = d + relativedelta(months=-12)
            elif int(result) == 1 :
                dt = d - timedelta(days=7)
        return queryset.filter(date__gte=dt)
    class Meta:
        model = UserWeight
        fields = ['selectNumber']

    

class CreateUserWeight(generics.ListCreateAPIView):   
    serializer_class = UserWeightSerializer
    queryset = UserWeight.objects.all()
    permission_classes=(permissions.IsAuthenticated, IsOwner,)

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserWeightFilter
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        if 'selectNumber' in self.request.GET:
            return self.queryset.filter(user=self.request.user).order_by('date')

        d = date.today()
        dt = d - timedelta(days=7)
        return self.queryset.filter(user=self.request.user).filter(date__gte=dt).order_by('date')

# 目標体重取得API(GET/PUT)
class GetGoalWeightView(generics.RetrieveAPIView):   
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes=(permissions.IsAuthenticated, IsOwner,)
    

    def get(self, request):
        return Response(data={
            'goal_weight': request.user.goal_weight,
            },
            status=status.HTTP_200_OK)

class PutGoalWeightView(generics.UpdateAPIView):   
    serializer_class = GoalWeightSerializer
    lookup_field = 'email'
    queryset = User.objects.all()
    print(User.objects.all())
    permission_classes=(permissions.IsAuthenticated, IsOwner,)

    def get_object(self):
        instance = self.queryset.get(email=self.request.user)
        return instance


        # token = request.GET.get('token')
        # payload = jwt.decode(token, settings.SECRET_KEY)
        # instance = self.queryset.get(id=payload['user_id'])
        # return instance


class kcalUpdate(generics.ListAPIView):
    permission_classes=(permissions.IsAuthenticated, IsOwner,)
    
    @transaction.atomic
    def list(self, request):
        u_id = self.request.user.id
        u_sex = self.request.user.sex
        u_active = self.request.user.active_level
        today = date.today()
        dy = relativedelta(today, self.request.user.birthday)
        u_age = dy.years
        sql = "update authentication_user set kcal_id = ( select id from ( select distinct k.id from kcalInfo k join authentication_user a where k.active_level = %(active)s and k.sex = %(sex)s and k.age = %(age)s ) as tmp ) where id = %(id)s"
        params = {"active": u_active, "sex": u_sex, "age": u_age, "id": u_id}
        cursor = connection.cursor()
        cursor.execute(sql, params)
        return Response(data={
            'kcal_id': request.user.kcal_id,
            },
            status=status.HTTP_200_OK)

class getKcalView(generics.ListAPIView):
    serializer_class = getKcalSerializer
    queryset = kcalInfo.objects.all()
    
    permission_classes=(permissions.IsAuthenticated, IsOwner,)
    
    def get_queryset(self):
        kcalID = User.objects.filter(id=self.request.user.id).values_list('kcal_id', flat=True)
        result = self.queryset.filter(pk=kcalID[0]).values('kcal')
        return result



# class kcalUpdate(generics.ListAPIView):
#     serializer_class = kcalUpdateSerializer
#     permission_classes=(permissions.IsAuthenticated, IsOwner,)

#     def list(self, request):
#         u_id = self.request.user.id
#         u_sex = self.request.user.sex
#         u_active = self.request.user.active_level
#         today = date.today()
#         dy = relativedelta(today, self.request.user.birthday)
#         u_age = dy.years
#         sql = "update authentication_user set kcal_id = ( select id from ( select distinct k.id from kcalInfo k join authentication_user a where k.active_level = %(active)s and k.sex = %(sex)s and k.age = %(age)s ) as tmp ) where id = %(id)s ;"
#         params = {"active": u_active, "sex": u_sex, "age": u_age, "id": u_id}
#         queryset = User.objects.raw(sql, params)
#         serializer = kcalUpdateSerializer(queryset)
#         print(queryset)
#         return Response(serializer.data)


# # 本当はsql文を書くのは良くないが時間がやばいのでそのまま書く
# class kcalUpdate(generics.ListAPIView):
#     serializer_class = kcalUpdateSerializer
#     permission_classes=(permissions.IsAuthenticated, IsOwner,)

#     def get_queryset(self):
#         u_id = self.request.user.id
#         u_sex = self.request.user.sex
#         u_active = self.request.user.active_level
#         today = date.today()
#         dy = relativedelta(today, self.request.user.birthday)
#         u_age = dy.years
#         sql = "update authentication_user set kcal_id = ( select id from ( select distinct k.id from kcalInfo k join authentication_user a where k.active_level = %(active)s and k.sex = %(sex)s and k.age = %(age)s ) as tmp ) where id = %(id)s ;"
#         params = {"active": u_active, "sex": u_sex, "age": u_age, "id": u_id}
#         queryset = User.objects.raw(sql, params)
#         return queryset

    # def list(self, request):
    #     u_id = self.request.user.id
    #     u_sex = self.request.user.sex
    #     u_active = self.request.user.active_level
    #     today = date.today()
    #     dy = relativedelta(today, self.request.user.birthday)
    #     u_age = dy.years
    #     sql = "update authentication_user set kcal_id = ( select id from ( select distinct k.id from kcalInfo k join authentication_user a where k.active_level = %(active)s and k.sex = %(sex)s and k.age = %(age)s ) as tmp ) where id = %(id)s ;"
    #     params = {"active": u_active, "sex": u_sex, "age": u_age, "id": u_id}
    #     queryset = User.objects.raw(sql, params)
    #     serializer = kcalUpdateSerializer(queryset)
    #     return Response(serializer.data)