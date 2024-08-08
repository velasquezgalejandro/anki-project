from rest_framework import generics
from .models import Categories, Subcategories
from .serializers import CategoriesSerializer, SubcategoriesSerializer


# Create your views here.
class CategoriesListCreateView(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class SubcategoriesListCreateView(generics.ListCreateAPIView):
    queryset = Subcategories.objects.all()
    serializer_class = SubcategoriesSerializer
