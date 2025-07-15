from .serializers import JobSerializer
from .models import Job
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count, Min, Max
from .filters import JobFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
def list_jobs(request):
    jobs = Job.objects.all().order_by("id")
    filterset = JobFilter(request.GET, jobs)

    count = filterset.qs.count()
    resPerPage = 3
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({"count": count, "resPerPage": resPerPage, "jobs": serializer.data})


@api_view(["GET"])
def get_job(request, pk):
    job = get_object_or_404(Job, pk=pk)

    serializer = JobSerializer(job)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_job(request):
    data = request.data
    data["user"] = request.user.id

    serializer = JobSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_job(request, pk):
    data = request.data
    user = request.user
    
    job = get_object_or_404(Job, pk=pk)
    if job.user != user: 
        return Response("You can't update this job as you aren't the owner.")
    
    serializer = JobSerializer(instance=job, data=data, partial=True)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)

    else:
        return Response(serializer.errors)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_job(request, pk):
    job = get_object_or_404(Job, pk=pk)
    user = request.user
    if job.user != user: 
        return Response("You can't delete this job as you aren't the owner.")
    try:
        job.delete()
    except Exception as e:
        return Response(e.error_messages)

    return Response("Job has been deleted!")


@api_view(["GET"])
def get_topics_stats(request, topic):
    args = {"title__icontains": topic}
    jobs = Job.objects.filter(**args)

    stats = jobs.aggregate(
        total_jobs=Count("title"),
        avg_positions=Avg("positions"),
        avg_salary=Avg("salary"),
        min_salary=Min("salary"),
        max_salary=Max("salary"),
    )

    return Response(stats)
