from django.test import TestCase
from persona.models import Persona
import csv

class PersonaModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Crear archivo CSV
        with open('test_failures.csv', mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Test Name', 'ID', 'Error'])

    def setUp(self):
        # Crear una persona
        self.persona = Persona.objects.create(nombre="ramiro", edad=30)
        self.failures = []

    def test_persona_creation(self):
        try:
            self.assertEqual(self.persona.nombre, "Juan")
        except AssertionError as e:
            self.failures.append({"id": self.persona.id, "error": f"Nombre no coincide: {str(e)}"})

        try:
            self.assertEqual(self.persona.edad, 30)
        except AssertionError as e:
            self.failures.append({"id": self.persona.id, "error": f"Edad no coincide: {str(e)}"})

        self.append_failures_to_csv('test_persona_creation')

        if self.failures:
            self.fail("\n".join([f"ID {f['id']}: {f['error']}" for f in self.failures]))

    def test_str_representation(self):
        try:
            self.assertEqual(str(self.persona), "Juan")
        except AssertionError as e:
            self.failures.append(f"__str__ no coincide: {str(e)}")

        self.append_failures_to_csv('test_str_representation')

        if self.failures:
            self.fail("\n".join([f"ID {f['id']}: {f['error']}" for f in self.failures]))

    def append_failures_to_csv(self, test_name):
        if not self.failures:
            return

        with open('test_failures.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            for failure in self.failures:
                writer.writerow([test_name, failure['id'], failure['error']])

    # def test_csv_file(self, test_name, id, Exception, **kwargs):
    #     print(self.failures)
    #     print('aqui2')

# from django.test import TestCase
# import csv
# from django.db.models import Prefetch


# from fuentes_moviles.classification import (
#     MedicionClassification,
#     InstrumentoClassification,
# )

# from fuentes_moviles.models import (
#     Prueba,
#     ResultadoFuentesMoviles,
#     IndicadorFuentesMoviles,
# )


# class TestIndicadores(TestCase):

#     data = {}

#     # def handle_failures(self, failures):
#     #     if failures:
#     #         print("Failures encountered:")
#     #         for failure in failures:
#     #             print(failure)
#     #         self.fail("One or more assertions failed.")

#     def setUp(self):
#         super().setUp()
#         self.failures = []

#     @classmethod
#     @timing_decorator
#     def setUpClass(cls):
#         super().setUpClass()
#         print_colored("\n\n\nSETUP CLASSIFICATION INITIAL INDICADORES", "\033[36m")

#         setup_data = {}

#         indicadores_prefetch = Prefetch(
#             "indicadorfuentesmoviles_set",
#             queryset=IndicadorFuentesMoviles.objects.select_related("parametro").filter(
#                 parametro__tipo="Evaluación"
#             ),
#         )
#         resultados_prefetch = Prefetch(
#             "resultadofuentesmoviles_set",
#             queryset=ResultadoFuentesMoviles.objects.select_related("parametro"),
#         )

#         # prefetch_related("indicadorfuentesmoviles_set_parametro", "resultadofuentesmoviles_set_parametro")
#         # tambien posible, pero el filtro parametro__tipo se tendria que implementar en el loop del dict
#         pruebas = Prueba.objects.select_related(
#             "vehiculo__tipo_vehiculo"
#         ).prefetch_related(indicadores_prefetch, resultados_prefetch)

#         with open("prueba_resultados.csv", mode="w", newline="") as file:
#             writer = csv.writer(file)
#             writer.writerow(["Norma", "ID", "Consecutivo", "Placa", "Resultados (len)"])

#             for index, prueba in enumerate(pruebas):
#                 print_progress_bar(index, len(pruebas))

#                 initial_data = MedicionClassification.get_init_values(
#                     prueba.id
#                 ) | InstrumentoClassification.get_init_values(prueba.id)

#                 norma = prueba.vehiculo.tipo_vehiculo.norma
#                 allow_test_4983 = norma == "4983" and len(initial_data) == 56
#                 allow_test_5365 = norma == "5365" and len(initial_data) == 50
#                 allow_test_4231 = norma == "4231" and len(initial_data) == 39

#                 if allow_test_5365 or allow_test_4983 or allow_test_4231:
#                     setup_data[prueba.id] = (
#                         initial_data
#                         | {"consecutivo": prueba.numero_consecutivo_prueba}
#                         | {"prueba_index": index}
#                     )
#                 else:
#                     writer.writerow(
#                         [
#                             prueba.vehiculo.tipo_vehiculo.norma,
#                             prueba.id,
#                             prueba.numero_consecutivo_prueba,
#                             prueba.vehiculo.placa,
#                             len(initial_data),
#                         ]
#                     )

#         cls.data = list(setup_data.values())

#     def validate_norma(self, norma, norma_to_skip=[]):
#         if norma in norma_to_skip:
#             self.skipTest(f"No aplica para la(s) norma(s): {norma_to_skip}")

#     def validate_formula(
#         self,
#         formula_evaluation,
#         api_db_evaluation,
#         id,
#         test_method,
#         norma,
#         index,
#         consecutivo,
#     ):
#         if api_db_evaluation is not None:
#             api_db_evaluation = api_db_evaluation.lower()

#             if api_db_evaluation != formula_evaluation:
#                 raise Exception(
#                     f"Expected: {api_db_evaluation} but got: {formula_evaluation} in test_{test_method} --> prueba_index: {index} --> consecutivo: {consecutivo} --> prueba id: {id} --> norma: {norma}"
#                 )

#     def evaluate_test(
#         self,
#         test_method,
#         api_key,
#         norma_to_skip,
#         type="medicion",
#     ):
#         print(f"\nExecuting type {type} --> test_{test_method}")

#         for index, values in enumerate(TestIndicadores.data):
#             print_progress_bar(index, len(TestIndicadores.data))

#             with self.subTest(index):
#                 norma = values.get("norma")
#                 consecutivo = values.get("consecutivo")
#                 prueba_index = values.get("prueba_index")
#                 # consecutivo = values.get("consecutivo")
#                 id = values.get("id")

#                 self.validate_norma(norma, norma_to_skip)

#                 instance = (
#                     MedicionClassification(**values)
#                     if type == "medicion"
#                     else InstrumentoClassification(**values)
#                 )

#                 try:
#                     formula_evaluation = getattr(instance, test_method)().lower()
#                 except AttributeError:
#                     raise

#                 api_db_evaluation = values.get(api_key)

#                 self.validate_formula(
#                     formula_evaluation,
#                     api_db_evaluation,
#                     id,
#                     test_method,
#                     norma,
#                     prueba_index,
#                     consecutivo,
#                 )

#                 # self.assertEqual(
#                 #     formula_evaluation,
#                 #     "cumple",
#                 #     f"test_{test_method} --> prueba_index: {prueba_index} --> consecutivo: {consecutivo} --> prueba id: {id} --> norma: {norma}",
#                 # )

#     # SECTION: TEMPERATURA AMBIENTE
#     @timing_decorator
#     def test_temperatura_ambiente(self):
#         self.evaluate_test("temperatura_ambiente", "TA_I", [])

#
