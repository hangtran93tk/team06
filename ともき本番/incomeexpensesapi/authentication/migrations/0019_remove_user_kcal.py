# Generated by Django 3.0.5 on 2020-12-18 14:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0018_auto_20201218_2354'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='kcal',
        ),
    ]
