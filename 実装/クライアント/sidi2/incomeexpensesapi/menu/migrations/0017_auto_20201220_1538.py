# Generated by Django 3.0.5 on 2020-12-20 06:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0016_foodstuff_myrecipe_usereat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myrecipe',
            name='foodstuff',
        ),
        migrations.RemoveField(
            model_name='myrecipe',
            name='menu',
        ),
        migrations.RemoveField(
            model_name='usereat',
            name='menu',
        ),
        migrations.RemoveField(
            model_name='usereat',
            name='user',
        ),
        migrations.DeleteModel(
            name='Foodstuff',
        ),
        migrations.DeleteModel(
            name='MyRecipe',
        ),
        migrations.DeleteModel(
            name='UserEat',
        ),
    ]
