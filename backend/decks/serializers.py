from rest_framework import serializers
from .models import Decks


class DecksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decks
        fields = ['id', 'title', 'question', 'answer', 'category', 'subcategory', 'comand', 'test']
