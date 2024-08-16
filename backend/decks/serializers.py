from rest_framework import serializers
from .models import Decks, Cards


class DecksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decks
        fields = ['id', 'title', 'category', 'subcategory']


class CardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = ['id', 'title', 'deck', 'question', 'answer', 'command']
