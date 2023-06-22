from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = OlxUser
        fields = ("username", "email", "profile", "id","date_joined")


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = OlxUser
        fields = ("username", "password")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        print(validated_data)
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad_Images
        fields = ("image",)


class CarsAdSerializer(serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = CarsAd
        fields = "__all__"


class MobileAdSerializer(serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = MobileAd
        fields = "__all__"


class PropertyAdSerializer(serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = PropertyAd
        fields = "__all__"


class AccessoryAdSerializer(serializers.ModelSerializer):
    related_images = ImageSerializer(read_only=True, many=True)
    posted_user = UserSerializer(read_only=True)

    class Meta:
        model = AccessoryAd
        fields = "__all__"


class ScooterAdSerializer(serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = ScooterAd
        fields = "__all__"
