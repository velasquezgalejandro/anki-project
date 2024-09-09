# Register your models here.
from django.contrib import admin
from .models import Persona


@admin.register(Persona)
class DecksAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('nombre', 'edad')
    ordering = ('id', )

