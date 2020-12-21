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
from .serializers import GetMenuInfoSerializer
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
            result = self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')
            print(menuID)
            print(str(self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')))
            return self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')
        elif 'date' in self.request.GET:
            d = self.request.GET['date']
            menuID = UserEat.objects.filter(user_id=userID, date=d, eatTime=eatTime).values('menu_id')
            return self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')
        #     return self.queryset.filter()
        # elif 'date' in self.request.GET:
        #     d = self.request.GET['date']
        #     return self.queryset.filter()
        menuID = UserEat.objects.filter(user_id=userID, date=d).values('menu_id')
        result = self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')
        print(str(self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')))
        return self.queryset.filter(pk__in=menuID).values('one_point','two_point','three_point', 'four_point','kcal')
        
            
        
        # result = self.queryset.filter(pk=kcalID[0]).values('kcal')
        # return result


# class UserWeightFilter(filters.FilterSet):
#     # 体重グラフ表示データ取得するためのフィルタ
#     selectNumber = filters.NumberFilter(method="get_date_filter")
#     def get_date_filter(self, queryset, name, value):
#         d = date.today()
#         # dt = d - timedelta(days=7)
#         if 'selectNumber' in self.request.GET:
#             result = self.request.GET['selectNumber']
#             if int(result) == 2 :
#                 dt = d + relativedelta(months=-1)
#             elif int(result) == 3 :
#                 dt = d + relativedelta(months=-12)
#             elif int(result) == 1 :
#                 dt = d - timedelta(days=7)
#         return queryset.filter(date__gte=dt)
#     class Meta:
#         model = UserWeight
#         fields = ['selectNumber']

    

# class CreateUserWeight(generics.ListCreateAPIView):   
#     serializer_class = UserWeightSerializer
#     queryset = UserWeight.objects.all()
#     permission_classes=(permissions.IsAuthenticated, IsOwner,)

#     filter_backends = (filters.DjangoFilterBackend,)
#     filterset_class = UserWeightFilter
    
#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)

#     def get_queryset(self):
#         if 'selectNumber' in self.request.GET:
#             return self.queryset.filter(user=self.request.user).order_by('date')

#         d = date.today()
#         dt = d - timedelta(days=7)
#         return self.queryset.filter(user=self.request.user).filter(date__gte=dt).order_by('date')
