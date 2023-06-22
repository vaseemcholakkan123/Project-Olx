from django.contrib import admin
from .models import CarsAd, MobileAd, PropertyAd, AccessoryAd, ScooterAd, Ad_Images

# Register your models here.

admin.site.register(CarsAd)
admin.site.register(MobileAd)
admin.site.register(PropertyAd)
admin.site.register(AccessoryAd)
admin.site.register(ScooterAd)
admin.site.register(Ad_Images)
