from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Decks, Cards
from .serializers import DecksSerializer, CardsSerializer
from django.core.files.uploadedfile import UploadedFile

import io
from ebooklib import epub
from pyepub import EPUB

# Create your views here.
class DecksListCreateView(generics.ListCreateAPIView):
    queryset = Decks.objects.all()
    serializer_class = DecksSerializer


class CardsListCreateView(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer

class EpubUploadView(APIView):
    def post(self, request, *args, **kwargs):
        epub_file = request.FILES.get('file')
        print('----------------')
        print(epub_file)
        print('----------------')

        if epub_file and epub_file.content_type == 'application/epub+zip':
            try:
                # # Leer el archivo EPUB
                file_content = epub_file.read()
                epub = EPUB(io.BytesIO(file_content))

                # # Extraer información básica
                print('----------extraer informacion---------------------------')
                print(epub)
                print('----------extraer informacion---------------------------')
# documents = []
#                 for item in epub.get_items():
#                     if item.get_type() == 'text':
#                         documents.append(item.get_content().decode('utf-8'))

#                 # Preparar la respuesta
#                 response_data = {
#                     'title': title,
#                     'author': author,
#                     'documents': documents[:5]  # Limitar el número de documentos mostrados
#                 }
#                 return Response(response_data, status=status.HTTP_200_OK)
                response_data = {}

                return Response(response_data, status=status.HTTP_200_OK)
            except Exception as e:
                # Imprime el rastreo del error en los logs
                print("Exception: ", e)
                return Response({'error': 'Failed to process EPUB file'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)


# class EpubUploadView(APIView):
#     def post(self, request, *args, **kwargs):
#         epub_file = request.FILES.get('file')
#         print('----------------')
#         print(epub_file)
#         print('----------------')
#         if epub_file and epub_file.content_type == 'application/epub+zip':
#             try:
#                 # Leer el archivo EPUB
#                 file_content = epub_file.read()

#                 # Procesar el archivo EPUB
#                 book = epub.read_epub(io.BytesIO(file_content))

#                 # Extraer información básica
#                 print('----------extraer informacion---------------------------')
#                 print(book)
#                 print('----------extraer informacion---------------------------')
#             #     title = book.get('title', 'Desconocido')
#             #     author = book.get('author', 'Desconocido')

#             #     # Puedes extraer más información si lo necesitas
#             #     documents = []
#             #     for item in book.items:
#             #         if item.get_type() == epub.EpubHtml:
#             #             documents.append(item.get_content().decode('utf-8'))

#             #     # Preparar la respuesta
#             #     response_data = {
#             #         'title': title,
#             #         'author': author,
#             #         'documents': documents[:5]  # Limitar el número de documentos mostrados
#             #     }
#                 response_data = {}

#                 return Response(response_data, status=status.HTTP_200_OK)
#             except Exception as e:
#                 # Imprime el rastreo del error en los logs
#                  print("Exception: ", e)
#                  return Response({'error': 'Failed to process EPUB file'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'error': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)
