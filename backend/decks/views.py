import pdfplumber

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Decks, Cards
from .serializers import DecksSerializer, CardsSerializer

# Create your views here.
class DecksListCreateView(generics.ListCreateAPIView):
    queryset = Decks.objects.all()
    serializer_class = DecksSerializer


class CardsListCreateView(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer

class UploadFileView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            self.handle_uploaded_file(file)
            return Response({'message': 'File uploaded and processed successfully!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def handle_uploaded_file(self, file):
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                lines = text.split('\n')
                for line in lines:
                    # Ajusta el procesamiento según la estructura del PDF
                    parts = line.split(',')
                    if len(parts) == 3:  # Cambia según el formato de datos esperado
                        deck_name, card_name, card_value = parts
                        deck, created = Decks.objects.get_or_create(name=deck_name)
                        Cards.objects.create(deck=deck, name=card_name, value=card_value)
