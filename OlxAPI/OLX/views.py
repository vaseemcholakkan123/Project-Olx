from rest_framework import generics
from .serializers import *
from .models import OlxUser, CarsAd
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .CustomMixins import AdMixin
from services.models import ChatThread
from services.serializers import *
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
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
                    prof = "https://moddroid.tk/olx-api" + user.profile.url
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
                    prof = "https://moddroid.tk" + user.profile.url
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

        Cars = CarsAdSerializer(CarsAd.objects.filter(posted_user__id=req_user_id), many=True,context={'request':request}).data
        Accessory = AccessoryAdSerializer(AccessoryAd.objects.filter(posted_user__id=req_user_id), many=True,context={'request':request}).data
        Mobile = MobileAdSerializer(MobileAd.objects.filter(posted_user__id=req_user_id), many=True,context={'request':request}).data
        Property = PropertyAdSerializer(PropertyAd.objects.filter(posted_user__id=req_user_id), many=True,context={'request':request}).data
        Scooter = ScooterAdSerializer(ScooterAd.objects.filter(posted_user__id=req_user_id), many=True,context={'request':request}).data

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
            location = request.GET['location']
        except:
            location = 'Kerala'

        try:
            query = request.GET['query']
        except:
            query = '' 

        Cars = CarsAdSerializer(CarsAd.objects.filter(ad_location=location,title__icontains=query), many=True,context={'request':request}).data
        Accessory = AccessoryAdSerializer(AccessoryAd.objects.filter(ad_location=location,title__icontains=query), many=True,context={'request':request}).data
        Mobile = MobileAdSerializer(MobileAd.objects.filter(ad_location=location,title__icontains=query), many=True,context={'request':request}).data
        Property = PropertyAdSerializer(PropertyAd.objects.filter(ad_location=location,title__icontains=query), many=True,context={'request':request}).data
        Scooter = ScooterAdSerializer(ScooterAd.objects.filter(ad_location=location,title__icontains=query), many=True,context={'request':request}).data

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
    permission_classes = [IsAuthenticated]

    def post(self,request):
        profile = request.data.get('profile')
        if not profile:
            return Response(status=status.HTTP_400_BAD_REQUEST,data='No embedded profile')
        request.user.profile.save(profile.name, profile, save=True)
        user_data = {
                    "username": request.user.username,
                    "user_id": request.user.id,
                    "profile": "https://moddroid.tk" + request.user.profile.url,
                    "email": request.user.email,
                }
        return Response(status=status.HTTP_200_OK,data={'user':user_data})
    
class AddToWishlist(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,*args,**kwargs):
        category = kwargs['category']
        id = kwargs['id']

        if not id or not category:
            return Response(status=status.HTTP_400_BAD_REQUEST,data={'message':'No data for adding item to wishlist'})

        if category == 'Car':
            item = CarsAd.objects.get(id=id)
        if category == 'Mobile':
            item = MobileAd.objects.get(id=id)
        if category == 'Accessory':
            item = AccessoryAd.objects.get(id=id)
        if category == 'Scooter':
            item = ScooterAd.objects.get(id=id)
        if category == 'Properties':
            item = PropertyAd.objects.get(id=id)

        if not item:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        WishList.objects.create(user=request.user,Ad=item)

        return Response(status=status.HTTP_200_OK)
    

class UserWishlist(ListAPIView):
    permission_classes = [IsAuthenticated]
        
    def get(self, request, *args, **kwargs):
        self.queryset = WishList.objects.filter(user=request.user)
        serializer_class = WishListSerializer(self.queryset,many=True,context={'request':request})
        res = {'Ads':[ad['Ad'] for ad in serializer_class.data]}
        return Response(status=status.HTTP_200_OK,data=res)


class RemoveWishlist(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,*args,**kwargs):
        category = kwargs['category']
        id = kwargs['id']
        if not id or not category:
            return Response(status=status.HTTP_400_BAD_REQUEST,data={'message':'No data for deleting item from wishlist'})

        if category == 'Car':
            item = CarsAd.objects.get(id=id)
        if category == 'Mobile':
            item = MobileAd.objects.get(id=id)
        if category == 'Accessory':
            item = AccessoryAd.objects.get(id=id)
        if category == 'Scooter':
            item = ScooterAd.objects.get(id=id)
        if category == 'Properties':
            item = PropertyAd.objects.get(id=id)

        if not item:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            wish_item = WishList.objects.get(user=request.user,content_type=ContentType.objects.get_for_model(item),obj_id=item.id)
            wish_item.delete()
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST,data={'message':'Internal error'})


        return Response(status=status.HTTP_200_OK)
    

class GetChatThreads(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):

        self.queryset = ChatThread.objects.by_user(user=request.user)

        if not self.queryset.exists():
            return Response(status=status.HTTP_200_OK,data='empty')

        serializer = ChatThreadSerializer(self.queryset,many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)
    
class GetThreadMessages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        reciever = OlxUser.objects.get(id=kwargs['reciever'])

        thread = ChatThread.objects.filter(
            Q(first_person=request.user, second_person=reciever) | 
            Q(first_person=reciever, second_person=request.user)
            )
        
        if not thread.exists():
            return Response(status=status.HTTP_200_OK,data='empty')
        
        messages = thread.first().chatmessage_thread.all()

        serializer = ChatMessageSerializer(messages,many=True)
        return Response(status=status.HTTP_200_OK,data=serializer.data)
    
