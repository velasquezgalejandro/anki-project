from django.db import models
from categories.models import Categories, Subcategories


# Create your models here.
class Persona(models.Model):
    nombre = models.CharField(max_length=200)
    edad = models.ForeignKey(Categories, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre



