from rest_framework import generics
from .models import Decks
from .serializers import DecksSerializer


# Create your views here.
class DecksListCreateView(generics.ListCreateAPIView):
    queryset = Decks.objects.all()
    serializer_class = DecksSerializer
