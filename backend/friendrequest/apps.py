from django.apps import AppConfig


class FriendrequestConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'friendrequest'

    def ready(self):
        import friendrequest.signals
