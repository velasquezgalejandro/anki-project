from rest_framework import generics
from .models import Persona
from .serializers import PersonaSerializer



# Create your views here.
class PersonaListCreateView(generics.ListCreateAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
