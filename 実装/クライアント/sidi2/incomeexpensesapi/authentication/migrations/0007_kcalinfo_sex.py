# Generated by Django 3.0.5 on 2020-12-17 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_auto_20201217_1029'),
    ]

    operations = [
        migrations.AddField(
            model_name='kcalinfo',
            name='sex',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
