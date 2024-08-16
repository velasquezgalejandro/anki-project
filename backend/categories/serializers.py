from rest_framework import serializers
from .models import Categories, Subcategories


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories()
        fields = ['id', 'title', 'laguange']


class SubcategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategories()
        fields = ['id', 'title', 'category']
