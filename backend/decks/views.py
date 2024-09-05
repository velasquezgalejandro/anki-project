from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Decks, Cards
from .serializers import DecksSerializer, CardsSerializer
from django.core.files.uploadedfile import UploadedFile
from django.http import JsonResponse

import io
from pyepub import EPUB
from ebooklib import epub
from EbookLib.epub import EpubHtml
import tempfile

import logging
import warnings

# Configura el logger
logger = logging.getLogger(__name__)

# Create your views here.
class DecksListCreateView(generics.ListCreateAPIView):
    queryset = Decks.objects.all()
    serializer_class = DecksSerializer


class CardsListCreateView(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer

class EpubUploadView(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == "POST" and request.FILES.get('epub'):
            epub_file = request.FILES['epub']

            # Crear un archivo temporal
            with tempfile.NamedTemporaryFile(delete=True) as tmp:
                tmp.write(epub_file.read())
                tmp.flush()  # Asegurarse de que los datos están escritos en disco

                # Leer el archivo epub desde el archivo temporal
                book = epub.read_epub(tmp.name)

            # Extraer el contenido del archivo epub
            content = []
            for item in book.get_items():
                if isinstance(item, EpubHtml):  # Verifica si el ítem es de tipo EpubHtml
                    content.append(item.get_content().decode('utf-8'))

            return JsonResponse({
                'content': content
            })
        else:
            return JsonResponse({
                'error': 'No se proporcionó un archivo EPUB válido.'
            }, status=400)


    # def post(self, request, *args, **kwargs):
    #     epub_file = request.FILES.get('file')

    #     if not epub_file or not epub_file.name.endswith('.epub'):
    #         return Response({'error': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)

    #     try:
    #         # Leer el archivo EPUB desde el request.FILES
    #         epub_content = epub_file.read()
    #         epub_file_io = io.BytesIO(epub_content)
    #         print('---------------------------file-io---------------------------')
    #         print(epub_file_io)
    #         print(epub_file)

    #         warnings.filterwarnings("ignore", category=UserWarning, module="ebooklib")
    #         libro = epub.read_epub(epub_file)
    #         print('---------------------libro-----------------')
    #         print(libro)


    #         # for item in libro.items():
    #         #     if item.get_type() == epub.ITEM_DOCUMENT:
    #         #         # Decodificar el contenido del ítem
    #         #         contenido = item.get_content().decode('utf-8')
    #         #         contenido_total.append(contenido)

    #         # Aquí podrías procesar el contenido según tus necesidades
    #         return Response({}, status=status.HTTP_200_OK)

    #     except Exception as e:
    #         # Manejo de errores
    #         logger.error(f"Error processing EPUB file: {e}", exc_info=True)
    #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


