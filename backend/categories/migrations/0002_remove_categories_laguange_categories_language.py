# Generated by Django 5.0.7 on 2024-08-23 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categories',
            name='laguange',
        ),
        migrations.AddField(
            model_name='categories',
            name='language',
            field=models.CharField(choices=[('EN', 'English'), ('ES', 'Spanish')], default='EN', max_length=200),
        ),
    ]
