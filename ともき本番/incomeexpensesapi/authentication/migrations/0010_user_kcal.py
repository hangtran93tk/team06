# Generated by Django 3.0.5 on 2020-12-18 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_remove_user_kcal'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='kcal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='authentication.kcalInfo'),
        ),
    ]
