from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path("signup/", views.sign_up, name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="signup"),
    path("refresh/", TokenRefreshView.as_view(), name="signup"),
    path("verify/", TokenVerifyView.as_view(), name="signup"),
]
