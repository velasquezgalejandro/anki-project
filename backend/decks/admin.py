# Register your models here.
from django.contrib import admin
from .models import Decks, Cards


@admin.register(Decks)
class DecksAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    search_fields = ('title', 'category', 'subcategory', 'language')
    ordering = ('id', )


@admin.register(Cards)
class CardsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'deck')
    search_fields = ('title', 'laguange', 'deck')
    ordering = ('id', )
