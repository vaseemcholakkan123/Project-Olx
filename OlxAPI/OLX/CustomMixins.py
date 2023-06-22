from rest_framework.response import Response
from rest_framework import status
from .models import Ad_Images
from django.db.models import Q
import datetime


class AdMixin:

    def perform_create(self, serializer):
        photos = self.request.data.getlist("related_images[]")
  
        if not photos:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": "No image provided"},
            )

        instance = serializer.save(posted_user=self.request.user)
        p_rel_id = []

        for photo in photos:
            p = Ad_Images.objects.create(image=photo)
            p_rel_id.append(p.id)

        instance.related_images.set(p_rel_id)
        return Response(status=status.HTTP_200_OK)

    def perform_destroy(self, instance):

        if instance.posted_user.id != self.request.user : 
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
        return super().perform_destroy(instance)
    
    def get_queryset(self):
        queryset = super().get_queryset()

        query_brand = self.request.GET.get('brand')
        query_year = self.request.GET.get('year')
        query_no_of_owners = self.request.GET.get('no_of_owners')
        query_km_driven = self.request.GET.get('km_driven')
        query_fuel_type = self.request.GET.get('fuel_type')
        query_transmission = self.request.GET.get('transmission')
        query_type = self.request.GET.get('type')
        query_building_type = self.request.GET.get('building_type')
        query_bedrooms = self.request.GET.get('bedrooms')
        query_bathrooms = self.request.GET.get('bathrooms')
        query_sort_by = self.request.GET.get('sort_by') 

        if query_sort_by == 'lowtohigh':
            query_sort_by = 'price'
        if query_sort_by == 'hightolow':
            query_sort_by = '-price'

        

        if query_brand:
            if query_brand == 'Maruti':
                query_brand = 'Maruti Suzuki'
            self.queryset = queryset.filter(brand=query_brand)
            
        if query_no_of_owners:
            self.queryset = queryset.filter(no_of_owners=int(query_no_of_owners))

        if query_fuel_type:
            if query_fuel_type == 'cn':
                query_fuel_type = 'CNG & Hybrids'
            self.queryset = queryset.filter(fuel_type=query_fuel_type)

        if query_transmission:
            self.queryset = queryset.filter(transmission_type=query_transmission)

        if query_type:
            self.queryset = queryset.filter(accessory_type=query_type)

        if query_building_type:
            if query_building_type =='HV':
                query_building_type = 'Houses & Villas'
            elif query_building_type == 'FH':
                query_building_type = 'Farm Houses'
            elif query_building_type == 'BF':
                query_building_type = 'Builder Floors'
            self.queryset = queryset.filter(building_type=query_building_type)

        if query_bedrooms:
            self.queryset = queryset.filter(bedrooms=int(query_bedrooms))

        if query_bathrooms:
            self.queryset = queryset.filter(bathrooms=int(query_bathrooms))

        if query_bathrooms and query_bedrooms:
            self.queryset = queryset.filter(bathrooms=int(query_bathrooms),bedrooms=int(query_bedrooms))
           

        if query_km_driven:
            split_below = query_km_driven.split('-')[0].split('blw')[1]
            split_above = query_km_driven.split('-')[1].split('abo')[1]
            self.queryset = queryset.filter(Q(km_driven__lte=split_below) & Q(km_driven__gte=split_above))

        if query_year:
            current_year = datetime.date.today().year
            self.queryset = queryset.filter(year__gte=current_year-int(query_year))   

        if query_sort_by:
            self.queryset = self.queryset.order_by(query_sort_by) 


        return super().get_queryset()