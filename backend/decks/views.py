from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Decks, Cards
from .serializers import DecksSerializer, CardsSerializer
from django.core.files.uploadedfile import UploadedFile

import io
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

        if epub_file and epub_file.content_type == 'application/epub+zip':
            try:
                # # Leer el archivo EPUB
                file_content = epub_file.read()
                epub = EPUB(io.BytesIO(file_content))
                documents = []

                for item in epub.contents:
                    src = item.get('src')
                    if src:
                        try:
                            # Leer el contenido del archivo usando 'src'
                            with epub.file_obj.open(src) as file:
                                file_content = file.read()
                                print('-----------------------')
                                print(file_content)
                                print('-----------------------')

                                # Si el archivo es HTML, decodificar su contenido
                                if src.endswith('.html'):
                                    documents.append(file_content.decode('utf-8'))
                        except Exception as e:
                            print(f'Error reading file {src}: {e}')

                # Extraer información básica (si tienes metadatos como título y autor)
                title = epub_book.get('title', 'Unknown Title')
                author = epub_book.get('author', 'Unknown Author')

                # Preparar la respuesta
                # response_data = {
                #     'title': title,
                #     'author': author,
                #     'documents': documents[:5]  # Limitar el número de documentos mostrados
                # }

                # return Response(response_data, status=status.HTTP_200_OK)

                # for item in epub.contents:
                #     print(item)
                #     if hasattr(item, 'get_type') and item.get_type() == 'text':
                #         print('------------adrento-------------')
                #         print(item)
                #         if hasattr(item, 'get_content'):
                #             print('------------adrento-------------')
                #             print(item.getContent())
                            # documents.append(item.get_content().decode('utf-8'))

#                 # Extraer información básica
#                 documents = []
#                 print('----------extraer informacion---------------------------')
#                 print(documents)
#                 print('----------extraer informacion---------------------------')
# #                 # Preparar la respuesta
# #                 response_data = {
# #                     'title': title,
# #                     'author': author,
# #                     'documents': documents[:5]  # Limitar el número de documentos mostrados
# #                 }
# #                 return Response(response_data, status=status.HTTP_200_OK)
                response_data = {}

                return Response(response_data, status=status.HTTP_200_OK)
            except Exception as e:
                # Imprime el rastreo del error en los logs
                print("Exception: ", e)
                return Response({'error': 'Failed to process EPUB file'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)
