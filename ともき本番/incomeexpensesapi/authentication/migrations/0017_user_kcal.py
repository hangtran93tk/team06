# Generated by Django 3.0.5 on 2020-12-18 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0016_remove_user_kcal'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='kcal',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='authentication.kcalInfo'),
        ),
    ]
