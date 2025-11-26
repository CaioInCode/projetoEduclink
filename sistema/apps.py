from django.apps import AppConfig



class SistemaProfessorConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "sistema"
class SistemaConfig(AppConfig):
    name = 'sistema'

    def ready(self):
        import sistema.signals