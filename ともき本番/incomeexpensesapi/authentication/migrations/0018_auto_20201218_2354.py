# Generated by Django 3.0.5 on 2020-12-18 14:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0017_user_kcal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='kcal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='authentication.kcalInfo'),
        ),
    ]
