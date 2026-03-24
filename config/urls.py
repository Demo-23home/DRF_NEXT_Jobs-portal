from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Jobbee",
        default_version="v1",
        description="This is a kickstart Project so you Can clone it and use it as a reusable part in future projects to save time and insure consistency .",
        contact=openapi.Contact("zeyadslama23@gmail.com"),
        license=openapi.License("MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path(
        "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/v1/jobs/", include("core_apps.job.urls")),
    path("api/v1/accounts/", include("core_apps.account.urls")),
]


# works only in production when debug is False, as an api only application would expect not as an html response as the django generic would be.
handler500 = "core_apps.utils.error_views.handler500"
handler404 = "core_apps.utils.error_views.handler404"
