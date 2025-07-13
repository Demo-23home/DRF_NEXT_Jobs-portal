from django.urls import path
from . import views 


urlpatterns = [
    path("", views.list_jobs, name="list-jobs"),
    path("<int:pk>/", views.get_job, name="list-jobs"),
    path("new/", views.create_job, name="list-jobs"),
    path("update/<int:pk>/", views.update_job, name="list-jobs"),
    path("delete/<int:pk>/", views.update_job, name="list-jobs"),
]
