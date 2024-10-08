"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from decks.views import DecksListCreateView, CardsListCreateView, EpubUploadView
from categories.views import CategoriesListCreateView, SubcategoriesListCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('decks/', DecksListCreateView.as_view(), name='deck-list-create'),
    path('cards/', CardsListCreateView.as_view(), name='card-list-create'),
    path('categories/', CategoriesListCreateView.as_view(), name='categories-list-create'),
    path('subcategories/', SubcategoriesListCreateView.as_view(), name='subcategories-list-create'),
    path('upload/', EpubUploadView.as_view(), name='upload-epub'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

