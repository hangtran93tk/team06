from rest_framework import serializers
from .models import Foodstuff, MenuInfo, MyRecipe, UserEat
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed

import datetime
from datetime import timedelta
from django.db.models import Sum

# 食事の４群点数とカロリーを取るためのシリアライザ
class GetMenuInfoSerializer(serializers.ModelSerializer):
    eatTime = serializers.SerializerMethodField()
    class Meta:
        model=MenuInfo
        fields = ['one_point','two_point','three_point', 'four_point', 'kcal', 'jp_name', 'eatTime']
    def get_eatTime(self, obj):
        print("これはあああああああ" + str(obj))
        eat_time_abstruct_contents = obj.get('eatmenu__eatTime')
        return eat_time_abstruct_contents
class GetKcalSerializer(serializers.ModelSerializer):
    class Meta:
        model=MenuInfo
        fields = ['kcal']


# カロリーグラフ表示のためのシリアライザ
class GetUserEatSerializer(serializers.ModelSerializer):
    kcal = serializers.SerializerMethodField()
    class Meta:
        model=UserEat
        fields = ['date','kcal']
    def get_kcal(self, obj):
        # print('objのなかみは' + str(UserEat.objects.all().values('date').annotate(kcal=Sum('menu__kcal')).filter(date=obj.date).values('kcal')))
    #     test = GetKcalSerializer().data
    #     print('これは' + str(MenuInfo.objects.all().annotate(kcal=Sum('kcal'))))
        # print(str(MenuInfo.objects.all().values(date).annotate(kcal=Sum('kcal'))))
        kcal_abstruct_contents = obj.get('kcal')
        # print(str(kcal_abstruct_contents))
    #     print(str(kcal_abstruct_contents))
        return kcal_abstruct_contents
        # try:    .annotate(kcal=Sum('kcal'))
        #     kcal_abstruct_contents = GetMenuInfoSerializer(MenuInfo.objects.all().filter(pk=obj.menu_id).values(obj.date).annotate(kcal=Sum('kcal')))
        #     return kcal_abstruct_contents
        # except:
        #     kcal_abstruct_contents = None
        #     return kcal_abstruct_contents