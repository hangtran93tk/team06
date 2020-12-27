from django.shortcuts import render

from rest_framework import generics, status, views, permissions, viewsets, mixins

from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Foodstuff, MenuInfo, MyRecipe, UserEat
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
from .serializers import GetMenuInfoSerializer, GetUserEatSerializer
from django.db.models import Sum
# Create your views here.

# class UserKcalInfoFilter(filters.FilterSet):
#     date = filters.DateTimeFilter(method="get_date_filter")
#     eatTime = filters.NumberFilter(method="get_eatTime_filter")
#     def get_date_filter(self, queryset, name, value):
#         if 'date' in self.request.GET:
#             dateResult = self.request.GET['date']
#             return queryset.filter(date=dateResult)
#     def get_eatTime_filter(self, queryset, name, value):
#         if 'eatTime' in self.request.GET:
#             eatTimeResult = self.request.GET['eatTime']
#             return queryset.filter(eatTime=eatTimeResult)
#     class Meta:
#             model=MenuInfo
#             fields = ['date', 'eatTime']

class getMenuInfoView(generics.ListAPIView):
    serializer_class = GetMenuInfoSerializer
    queryset = MenuInfo.objects.all()
    permission_classes=(permissions.IsAuthenticated, IsOwner,)
    # filter_backends = (filters.DjangoFilterBackend,)
    # filterset_class = UserKcalInfoFilter
    
    def get_queryset(self):
        userID = self.request.user.id
        d = date.today()
        
        # User.objects.filter(id=self.request.user.id).values_list('kcal_id', flat=True)
        if 'date' in self.request.GET and 'eatTime' in self.request.GET:
            d = self.request.GET['date']
            eatTime = self.request.GET['eatTime']
            menuID = UserEat.objects.filter(user_id=userID, date=d, eatTime=eatTime).values('menu_id')
            # result = self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')
            result = self.queryset.filter(pk__in=menuID, eatmenu__date=d).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name', 'eatmenu__eatTime')
            # print(menuID)
            # print(str(self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')))
            # return self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')
            return result
        elif 'date' in self.request.GET:
            d = self.request.GET['date']
            menuID = UserEat.objects.filter(user_id=userID, date=d, eatTime=eatTime).values('menu_id')
            result = self.queryset.filter(pk__in=menuID, eatmenu__date=d).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name', 'eatmenu__eatTime')
            return result
        elif 'eatTime' in self.request.GET:
            eatTime = self.request.GET['eatTime']
            menuID = UserEat.objects.filter(user_id=userID, date=d, eatTime=eatTime).values('menu_id')
            result = self.queryset.filter(pk__in=menuID, eatmenu__date=d).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name', 'eatmenu__eatTime')
            # result = self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')
            # print(menuID)
            # print(str(self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')))
            return result

        menuID = UserEat.objects.filter(user_id=userID, date=d).values('menu_id')
        result = self.queryset.filter(pk__in=menuID, eatmenu__date=d).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name', 'eatmenu__eatTime')
        # print("テスト中の確認ああああああ" + str(result))
        return result
        
        # menuID = UserEat.objects.filter(user_id=userID, date=d).values('menu_id')
        # result = self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')
        # print(str(self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')))
        # return self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal', 'jp_name')

class UserEatFilter(filters.FilterSet):
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
        model = UserEat
        fields = ['selectNumber']

class getUserEatView(generics.ListAPIView):
    
    queryset = UserEat.objects.all()
    permission_classes=(permissions.IsAuthenticated, IsOwner,)
    serializer_class = GetUserEatSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserEatFilter

    def get_queryset(self):
        d = date.today()
        
        if 'selectNumber' in self.request.GET:
            # 一番成功している例
            print('これはですね' + str(self.queryset.filter(user_id=self.request.user.id).values('date').annotate(kcal=Sum('menu__kcal')).order_by('date')))
            return self.queryset.filter(user_id=self.request.user.id).values('date').annotate(kcal=Sum('menu__kcal')).order_by('date')

        d = date.today()
        dt = d - timedelta(days=7)
        # return self.queryset.filter(user_id=self.request.user.id).filter(date__gte=dt).order_by('date')
        return self.queryset.filter(user_id=self.request.user.id).values('date').annotate(kcal=Sum('menu__kcal')).filter(date__gte=dt).order_by('date')

        