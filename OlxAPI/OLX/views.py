from rest_framework import generics
from .serializers import *
from .models import OlxUser, CarsAd
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .CustomMixins import AdMixin
 

# createmodelmixin explicilty changed make it with mro


# class UsersList(generics.ListCreateAPIView):
#     permission_classes = [AllowAny]
#     queryset = OlxUser.objects.all()
#     serializer_class = UserSerializer


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serialize_data = CreateUserSerializer(data=request.data)
        if serialize_data.is_valid():
            new_user = serialize_data.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serialize_data.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username_data = request.data.pop("username", None)
        password_data = request.data.pop("password", None)

        if username_data and password_data:
            user = authenticate(username=username_data, password=password_data)
            if user:
                if user.profile:
                    prof = "http://127.0.0.1:8000" + user.profile.url
                else:
                    prof = None
                user_data = {
                    "username": user.username,
                    "user_id": user.id,
                    "profile": prof,
                    "email": user.email,
                }
                return Response(
                    status=status.HTTP_202_ACCEPTED,
                    data={"message": "logged in", "user": user_data},
                )
            else:
                if OlxUser.objects.filter(username=username_data).exists():
                    return Response(
                        status=status.HTTP_401_UNAUTHORIZED,
                        data={"message": "Password Wrong !"},
                    )
                else:
                    return Response(
                        status=status.HTTP_400_BAD_REQUEST,
                        data={"message": "No Such User !"},
                    )
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": "credentials not provided"},
            )


class Logout(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh-token"])
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": "Token Not Provided"},
            )


class AdminLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username_data = request.data.pop("username", None)
        password_data = request.data.pop("password", None)

        if username_data and password_data:
            user = authenticate(username=username_data, password=password_data)
            if user:
                if not user.is_superuser:
                    return Response(
                        status=status.HTTP_401_UNAUTHORIZED,
                        data={"message": "Username is not admin"},
                    )

                if user.profile:
                    prof = "http://127.0.0.1:8000" + user.profile.url
                else:
                    prof = None
                user_data = {
                    "username": user.username,
                    "user_id": user.id,
                    "profile": prof,
                    "email": user.email,
                }
                return Response(
                    status=status.HTTP_202_ACCEPTED,
                    data={"message": "logged in as admin", "user": user_data},
                )
            else:
                if OlxUser.objects.filter(username=username_data).exists():
                    return Response(
                        status=status.HTTP_401_UNAUTHORIZED,
                        data={"message": "Password Wrong !"},
                    )
                else:
                    return Response(
                        status=status.HTTP_400_BAD_REQUEST,
                        data={"message": "No Such User !"},
                    )
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": "credentials not provided"},
            )


class GetForProfile(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    lookup_field = "id"
    queryset = OlxUser.objects.all()


# class theUser(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = OlxUser.objects.all()

#     def get_object(self):
#         username_slug = self.kwargs["pk"]
#         try:
#             int(username_slug)
#             user = get_object_or_404(OlxUser, pk=username_slug)
#             return user
#         except:
#             user = get_object_or_404(OlxUser, username__icontains=username_slug)
#             return user

#     permission_classes = [AllowAny]

class SearchUser(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):

        result = UserSerializer(OlxUser.objects.filter(username__icontains=kwargs['query']), many=True).data

        return Response(
            status=status.HTTP_200_OK,
            data={
                "Users": result,
            },
        )


class ListUserAds(APIView):
    permission_classes = [AllowAny]


    def get(self,request,*args,**kwargs):
        try:
            req_user_id = kwargs['user_id']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST,data={'message':'user id not provided'})

        Cars = CarsAdSerializer(CarsAd.objects.filter(posted_user__id=req_user_id), many=True).data
        Accessory = AccessoryAdSerializer(AccessoryAd.objects.filter(posted_user__id=req_user_id), many=True).data
        Mobile = MobileAdSerializer(MobileAd.objects.filter(posted_user__id=req_user_id), many=True).data
        Property = PropertyAdSerializer(PropertyAd.objects.filter(posted_user__id=req_user_id), many=True).data
        Scooter = ScooterAdSerializer(ScooterAd.objects.filter(posted_user__id=req_user_id), many=True).data

        return Response(
            status=status.HTTP_200_OK,
            data={
                "Cars": Cars,
                "Mobile": Mobile,
                "Property": Property,
                "Accessory": Accessory,
                "Scooter": Scooter,
            },
        )

class ListAds(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            location = kwargs['location']
        except:
            location = 'Kerala'

        try:
            query = kwargs['query']
        except:
            query = '' 

        Cars = CarsAdSerializer(CarsAd.objects.filter(ad_location=location,title__icontains=query), many=True).data
        Accessory = AccessoryAdSerializer(AccessoryAd.objects.filter(ad_location=location,title__icontains=query), many=True).data
        Mobile = MobileAdSerializer(MobileAd.objects.filter(ad_location=location,title__icontains=query), many=True).data
        Property = PropertyAdSerializer(PropertyAd.objects.filter(ad_location=location,title__icontains=query), many=True).data
        Scooter = ScooterAdSerializer(ScooterAd.objects.filter(ad_location=location,title__icontains=query), many=True).data

        return Response(
            status=status.HTTP_200_OK,
            data={
                "Cars": Cars,
                "Mobile": Mobile,
                "Property": Property,
                "Accessory": Accessory,
                "Scooter": Scooter,
            },
        )


class CarAds(AdMixin,viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = CarsAdSerializer
    queryset = CarsAd.objects.all()
    model = CarsAd



class ScooterAds(AdMixin,viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ScooterAdSerializer
    queryset = ScooterAd.objects.all()



class MobileAds(AdMixin,viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = MobileAd.objects.all()
    serializer_class = MobileAdSerializer



class AccessoryAds(AdMixin ,viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = AccessoryAd.objects.all()
    serializer_class = AccessoryAdSerializer


   


class PropertyAds(AdMixin,viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = PropertyAd.objects.all()
    serializer_class = PropertyAdSerializer

class ChangeProfile(APIView):
    permission_classes = [AllowAny]


    def post(self,request):
        profile = request.Files
        print('called===============')
        print(profile)
        return Response(status=status.HTTP_200_OK)