from django.contrib import admin
from .models import Categories, Subcategories


# Register your models here.
@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    search_fields = ('title', 'laguange')
    ordering = ('id', )


@admin.register(Subcategories)
class SubcategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    search_fields = ('title', 'language', 'category')
    ordering = ('id', )
