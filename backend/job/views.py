from .serializers import JobSerializer
from .models import Job
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count, Min, Max
from.filters import JobFilter

@api_view(["GET"])
def list_jobs(request):
    jobs = Job.objects.all().order_by("id")
    filterset = JobFilter(request.GET, jobs)

    serializer = JobSerializer(filterset.qs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_job(request, pk):
    job = get_object_or_404(Job, pk=pk)

    serializer = JobSerializer(job)
    return Response(serializer.data)


@api_view(["POST"])
def create_job(request):
    data = request.data

    serializer = JobSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


@api_view(["PUT"])
def update_job(request, pk):
    data = request.data

    job = get_object_or_404(Job, pk=pk)

    serializer = JobSerializer(instance=job, data=data, partial=True)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)

    else:
        return Response(serializer.errors)


@api_view(["DELETE"])
def delete_job(request, pk):
    job = get_object_or_404(Job, pk=pk)

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
