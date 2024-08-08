from rest_framework import generics
from .models import Decks, Cards
from .serializers import DecksSerializer, CardsSerializer


# Create your views here.
class DecksListCreateView(generics.ListCreateAPIView):
    queryset = Decks.objects.all()
    serializer_class = DecksSerializer


class CardsListCreateView(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
