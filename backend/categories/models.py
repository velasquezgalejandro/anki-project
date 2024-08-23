from django.db import models

LANGUAGE_CHOICES = [
    ('EN', 'English'),
    ('ES', 'Spanish'),
]


# Create your models here.
class Categories(models.Model):
    title = models.CharField(max_length=200)
    language = models.CharField(max_length=200, choices=LANGUAGE_CHOICES, default='EN')

    def __str__(self):
        print('el modelo funciona')
        return self.title


class Subcategories(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return self.title
