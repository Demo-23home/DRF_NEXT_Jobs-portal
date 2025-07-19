from django.urls import path
from . import views 


urlpatterns = [
    path("", views.list_jobs, name="list-jobs"),
    path("<int:pk>/", views.get_job, name="get-job"),
    path("new/", views.create_job, name="create-job"),
    path("update/<int:pk>/", views.update_job, name="update-jobs"),
    path("delete/<int:pk>/", views.update_job, name="delete-jobs"),
    path("stats/<str:topic>/", views.get_topics_stats, name="stats-jobs"),
    path("apply/<int:pk>/", views.apply_to_job, name="job-applying"),
    path("list/applications/", views.list_user_applications, name="list-applications"),
    path("<int:pk>/applied/", views.is_applied, name="is-applied"),
    path("user/created/", views.user_created_jobs, name="user-jobs"),
    path("<int:pk>/candidates/", views.candidates_applied, name="job-candidates"),
]
