# Generated by Django 3.0.5 on 2020-12-20 05:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('menu', '0010_foodstuff_menuinfo_myrecipe_usereat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menuinfo',
            name='user',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='infouser', to=settings.AUTH_USER_MODEL),
        ),
    ]
