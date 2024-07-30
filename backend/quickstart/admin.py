# Register your models here.
from django.contrib import admin
from .models import Decks

@admin.register(Decks)
class DecksAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    search_fields = ('title',)
    ordering = ('id',)
