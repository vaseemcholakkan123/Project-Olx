from django.db import models
from django.contrib.auth.models import AbstractUser

CATEGORY = (
    ("Mobile", "Mobile"),
    ("Properties", "Properties"),
    ("Accessory", "Accessory"),
    ("Car", "Car"),
    ("Scooter", "Scooter"),
)
LOCATION = (
    ("Kerala", "Kerala"),
    ("Karnataka", "Karntaka"),
    ("Tamil Nadu", "Tamil Nadu"),
)

MOBILE_BRANDS = (
    (
        "iPhone",
        "iPhone",
    ),
    ("Samsung", "Samsung"),
    ("Oppo", "Oppo"),
    ("Realme", "Realme"),
    ("Vivo", "Vivo"),
)


class OlxUser(AbstractUser):
    profile = models.ImageField(upload_to="profiles", null=True)
    email = models.EmailField(null=True, blank=True)


class Ad_Images(models.Model):
    image = models.ImageField(upload_to="Ad_Images", null=True)


class AdBase(models.Model):
    title = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    posted_user = models.ForeignKey(OlxUser, null=False, on_delete=models.CASCADE)
    category = models.CharField(choices=CATEGORY, null=False)
    ad_location = models.CharField(choices=LOCATION, null=False)
    price = models.PositiveIntegerField(null=False)
    date_created = models.DateField(auto_now_add=True)
    related_images = models.ManyToManyField(Ad_Images)

    class Meta:
        abstract = True


class MobileAd(AdBase):
    model_name = models.CharField(max_length=50, null=False)
    brand = models.CharField(choices=MOBILE_BRANDS, null=False)
    battery_health = models.IntegerField(null=False)
    years_used = models.IntegerField(null=False)


PROPERTY_TYPES = (
    ("Apartments", "Apartments"),
    ("Builder Floors", "Builder Floors"),
    ("Farm Houses", "Farm Houses"),
    ("Houses & Villas", "Houses & Villas"),
)
BANDB = ((1, 1), (2, 2), (3, 3), (4, 4), (5, 5))


class PropertyAd(AdBase):
    building_type = models.CharField(choices=PROPERTY_TYPES, null=False)
    bedrooms = models.IntegerField(choices=BANDB, null=False)
    bathrooms = models.IntegerField(choices=BANDB, null=False)


SCOOTER_BRANDS = (
    ("Bajaj", "Bajaj"),
    ("Hero", "Hero"),
    ("Honda", "Honda"),
    ("Mahindra", "Mahindra"),
    ("Suzuki", "Suzuki"),
    ("TVS", "TVS"),
)


class ScooterAd(AdBase):
    brand = models.CharField(choices=SCOOTER_BRANDS, null=False)
    model_name = models.CharField(max_length=50, null=False)
    km_driven = models.IntegerField(null=False)
    year = models.IntegerField(null=False)


ACCESSORY_TYPE = (("Mobile", "Mobile"), ("Tablet", "Tablet"))


class AccessoryAd(AdBase):
    accessory_type = models.CharField(choices=ACCESSORY_TYPE, null=False)


CAR_BRANDS = (
    ("Maruti Suzuki", "Maruti Suzuki"),
    ("Hyundai", "Hyundai"),
    ("Tata", "Tata"),
    ("Mahindra", "Mahindra"),
    ("Toyota", "Toyota"),
    ("Honda", "Honda"),
    ("Audi", "Audi"),
    ("Bmw", "Bmw"),
    ("Lexus", "Lexus"),
    ("Porsche", "Porsche"),
)
TRANSMISSION_TYPE = (("Automatic", "Automatic"), ("Manual", "Manual"))
FUEL_TYPES = (
    ("CNG & Hybrids", "CNG & Hybrids"),
    ("Diesel", "Diesel"),
    ("Electric", "Electric"),
    ("LPG", "LPG"),
    ("Petrol", "Petrol"),
)


class CarsAd(AdBase):
    brand = models.CharField(choices=CAR_BRANDS, null=False)
    model_name = models.CharField(max_length=50, null=False)
    km_driven = models.IntegerField(null=False)
    transmission_type = models.CharField(choices=TRANSMISSION_TYPE, null=False)
    fuel_type = models.CharField(choices=FUEL_TYPES, null=False)
    no_of_owners = models.IntegerField(choices=BANDB, null=False)


class WishList(models.Model):
    item = models.ForeignKey