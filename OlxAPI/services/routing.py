from django.urls import path
from . import chat


websocket_urlpatterns = [
    path("chat", chat.ChatUser.as_asgi()),
]
