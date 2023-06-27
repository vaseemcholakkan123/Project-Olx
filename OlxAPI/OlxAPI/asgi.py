"""
ASGI config for OlxAPI project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from services.routing import websocket_urlpatterns
from django.contrib.staticfiles.handlers import ASGIStaticFilesHandler
from services.middlewares import JwtAuthForAsgiStack
from channels.auth import AuthMiddlewareStack

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "OlxAPI.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket":  AuthMiddlewareStack( 
                            JwtAuthForAsgiStack( URLRouter(websocket_urlpatterns))
                                        )
    
    }
)

application = ASGIStaticFilesHandler(application)