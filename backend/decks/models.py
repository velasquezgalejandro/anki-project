from django.db import models
from categories.models import Categories, Subcategories

LANGUAGE_CHOICES = [
    ('EN', 'English'),
    ('ES', 'Spanish'),
]


# Create your models here.
class Decks(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='categories')
    subcategory = models.ForeignKey(Subcategories, on_delete=models.CASCADE, related_name='subCategories')
    language = models.CharField(max_length=200, choices=LANGUAGE_CHOICES, default='EN')

    def __str__(self):
        return self.title


class Cards(models.Model):
    deck = models.ForeignKey(Decks, on_delete=models.CASCADE, related_name='decks')
    title = models.CharField(max_length=200)
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    command = models.CharField(max_length=200)

    def __str__(self):
        return self.title
