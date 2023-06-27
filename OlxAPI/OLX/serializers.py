from rest_framework import serializers
from .models import *
from .CustomMixins import WishlistserializerMixin


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    def get_profile(self, instance):
        if instance.profile:
            image_url =  'https://moddroid.tk' + instance.profile.url
        else:
            image_url = None

        return image_url
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

        if password:
            instance.set_password(password)

        instance.save()
        return instance


class ImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    def get_image(self, instance):
        image_url = instance.image.url
        return image_url

    class Meta:
        model = Ad_Images
        fields = '__all__'


class CarsAdSerializer(WishlistserializerMixin,serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)
    is_wishlisted = serializers.SerializerMethodField()

    class Meta:
        model = CarsAd
        fields = "__all__"




class MobileAdSerializer(WishlistserializerMixin,serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)
    is_wishlisted = serializers.SerializerMethodField()


    class Meta:
        model = MobileAd
        fields = "__all__"


class PropertyAdSerializer(serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)
    is_wishlisted = serializers.SerializerMethodField


    class Meta:
        model = PropertyAd
        fields = "__all__"


class AccessoryAdSerializer(WishlistserializerMixin,serializers.ModelSerializer):
    related_images = ImageSerializer(read_only=True, many=True)
    posted_user = UserSerializer(read_only=True)
    is_wishlisted = serializers.SerializerMethodField()


    class Meta:
        model = AccessoryAd
        fields = "__all__"


class ScooterAdSerializer(WishlistserializerMixin,serializers.ModelSerializer):
    posted_user = UserSerializer(read_only=True)
    related_images = ImageSerializer(read_only=True, many=True)
    is_wishlisted = serializers.SerializerMethodField()


    class Meta:
        model = ScooterAd
        fields = "__all__"


class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = ['Ad']
    Ad = serializers.SerializerMethodField()

    def get_Ad(self,obj):
        content_type = obj.content_type
        obj_id = obj.obj_id

        try:
            ad_model_class = content_type.model_class()
            ad_instance = ad_model_class.objects.get(id=obj_id)

            if ad_model_class == CarsAd:
                ad_serializer = CarsAdSerializer(ad_instance,context=self.context)
            elif ad_model_class == ScooterAd:
                ad_serializer = ScooterAdSerializer(ad_instance,context=self.context)
            elif ad_model_class == AccessoryAd:
                ad_serializer = AccessoryAdSerializer(ad_instance,context=self.context)
            elif ad_model_class == MobileAd:
                ad_serializer = MobileAdSerializer(ad_instance,context=self.context)
            elif ad_model_class == PropertyAd:
                ad_serializer = PropertyAdSerializer(ad_instance,context=self.context)

            return ad_serializer.data
        
        except ad_model_class.DoesNotExist:
            return None