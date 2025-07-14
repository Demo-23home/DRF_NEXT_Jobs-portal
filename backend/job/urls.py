from django.urls import path
from . import views 


urlpatterns = [
    path("", views.list_jobs, name="list-jobs"),
    path("<int:pk>/", views.get_job, name="get-job"),
    path("new/", views.create_job, name="create-job"),
    path("update/<int:pk>/", views.update_job, name="update-jobs"),
    path("delete/<int:pk>/", views.update_job, name="delete-jobs"),
    path("stats/<str:topic>/", views.get_topics_stats, name="stats-jobs"),
]
