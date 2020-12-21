# Generated by Django 3.0.5 on 2020-12-18 15:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('menu', '0007_delete_usereat'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserEat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eatTime', models.IntegerField(choices=[(1, '朝食'), (2, '昼食'), (3, '夕食'), (4, '間食')])),
                ('date', models.DateField(auto_now_add=True)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu', to='menu.menuInfo')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
