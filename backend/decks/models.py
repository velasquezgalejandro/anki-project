from django.db import models


# Create your models here.
class Decks(models.Model):
    title = models.CharField(max_length=200)
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    subcategory = models.CharField(max_length=200)
    comand = models.CharField(max_length=200)
    laguanje = models.CharField(max_length=200)
    test = models.CharField(max_length=200)

    def __str__(self):
        return self.title
