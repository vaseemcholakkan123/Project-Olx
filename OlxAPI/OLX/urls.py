from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register("Theuser", views.theUser, basename="Theuserrrrr")
router.register("ads-Car", views.CarAds, basename="Cars")
router.register("ads-Mobile", views.MobileAds, basename="Mobile")
router.register("ads-Property", views.PropertyAds, basename="Property")
router.register("ads-Accessory", views.AccessoryAds, basename="Accessory")
router.register("ads-Scooter", views.ScooterAds, basename="scooterAd")


urlpatterns = [
    # path("get-users", views.UsersList.as_view(), name="get_users"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("create-user/", views.CreateUser.as_view(), name="create_user"),
    path("login/", views.UserLogin.as_view(), name="login"),
    path("logout/", views.Logout.as_view(), name="logout"),
    path("admin-login/", views.AdminLogin.as_view(), name="admin_login"),
    path("get-user/<int:id>", views.GetForProfile.as_view(), name="get-for-profile"),
    path("get-user-ads/<user_id>",views.ListUserAds.as_view(),name='list-user-ads'),
    path("lsads/<location>/<query>", views.ListAds.as_view(), name="ads"),
    path("lsads/<location>", views.ListAds.as_view(), name="ads"),
    path('search-user/<query>',views.SearchUser.as_view(),name='user-search'),
    path('edit-profile_pic',views.ChangeProfile.as_view(),name='cahnge-profile'),
    path('wishlist_ad/<category>/<id>',views.AddToWishlist.as_view(),name='wishlist_add'),
    path('get-user-wishlist',views.UserWishlist.as_view(),name='get-wishlist'),
    path('remove_wishlist_ad/<category>/<id>',views.RemoveWishlist.as_view(),name='remove-wishlist-item'),
    path('get-chat-threads',views.GetChatThreads.as_view(),name='chat-threads'),
    path('get-thread-messages/<reciever>',views.GetThreadMessages.as_view(),name='thread-messages'),
]

urlpatterns = urlpatterns + router.urls
