# Generated by Django 5.0.7 on 2024-08-08 18:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('decks', '0003_rename_answer_decks_laguange_remove_decks_comand_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='decks',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='categories.categories'),
        ),
        migrations.AlterField(
            model_name='decks',
            name='laguange',
            field=models.CharField(choices=[('EN', 'English'), ('ES', 'Spanish')], default='EN', max_length=200),
        ),
        migrations.AlterField(
            model_name='decks',
            name='subcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subCategories', to='categories.subcategories'),
        ),
    ]