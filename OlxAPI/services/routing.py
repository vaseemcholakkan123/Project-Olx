from django.urls import path
import django
django.setup()
from . import chat


websocket_urlpatterns = [
    path("olx-api/chat", chat.ChatUser.as_asgi()),
]
