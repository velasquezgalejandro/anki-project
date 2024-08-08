from django.db import models


# Create your models here.
class Categories(models.Model):
    title = models.CharField(max_length=200)
    laguange = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Subcategories(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return self.title
