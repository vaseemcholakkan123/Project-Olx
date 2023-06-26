from rest_framework import serializers
from .models import *
from OLX.serializers import UserSerializer

class ChatThreadSerializer(serializers.ModelSerializer):
    first_person = UserSerializer()
    second_person = UserSerializer()

    class Meta:
        model = ChatThread
        fields = '__all__'


class ChatMessageSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    thread = ChatThreadSerializer()
    timestamp = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%f")

    class Meta:
        model = ChatMessage
        fields = '__all__'