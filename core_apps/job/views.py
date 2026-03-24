from datetime import timezone
from .serializers import JobSerializer, CandidatesAppliedSerializer
from .models import CandidatesApplied, Job
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count, Min, Max
from .filters import JobFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


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

    candidates = job.candidates_applied.all().count()

    serializer = JobSerializer(job)
    return Response({"job": serializer.data, "candidates": candidates})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_job(request):
    data = request.data
    # If multiple jobs are sent
    if isinstance(data, list):
        created_jobs = []
        errors = []
        for i, item in enumerate(data):
            serializer = JobSerializer(data=item, context={"request": request})
            if serializer.is_valid():
                serializer.save()
                created_jobs.append(serializer.data)
            else:
                errors.append({"index": i, "errors": serializer.errors})
        if errors:
            return Response(
                {"created": created_jobs, "errors": errors},
                status=status.HTTP_207_MULTI_STATUS,
            )
        return Response({"created": created_jobs}, status=status.HTTP_201_CREATED)
    # If a single job is sent
    elif isinstance(data, dict):
        serializer = JobSerializer(data=data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(
            {"error": "Invalid data format. Must be an object or list of objects."},
            status=status.HTTP_400_BAD_REQUEST,
        )


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

    if  len(jobs) == 0:
        return Response({"message": f"No stats found for {topic}!."})

    stats = jobs.aggregate(
        total_jobs=Count("title"),
        avg_positions=Avg("positions"),
        avg_salary=Avg("salary"),
        min_salary=Min("salary"),
        max_salary=Max("salary"),
    )

    return Response(stats)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def apply_to_job(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    if not user.user_profile:
        return Response(
            {"error": "You have to upload your resume before applying!."}, status=400
        )

    serializer = CandidatesAppliedSerializer(
        data={"job": job.id}, context={"request": request}
    )

    already_applied = job.candidates_applied.filter(user=user).exists()

    if already_applied:
        return Response(
            {"error": "you have already applied for this position"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({"applied": True, "job_id": job.id}, status=200)
    else:
        return Response({"error": serializer.errors}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_user_applications(request):
    user = request.user

    applications = CandidatesApplied.objects.filter(user=user)

    if not applications:
        return Response("You didn't apply to any jobs yet!.")

    serializer = CandidatesAppliedSerializer(applications, many=True)

    return Response(serializer.data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def is_applied(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    applied = job.candidates_applied.filter(user=user).exists()

    return Response(applied)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_created_jobs(request):
    user = request.user

    args = {"user": user.id}

    jobs = Job.objects.filter(**args)
    serializer = JobSerializer(jobs, many=True)

    return Response({"data": serializer.data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def candidates_applied(request, pk):
    owner = request.user
    job = get_object_or_404(Job, id=pk)

    if not job.user == owner:
        return Response("You aren't the owner of this job!.")

    candidates = job.candidates_applied.all()

    serializer = CandidatesAppliedSerializer(candidates, many=True)

    return Response(serializer.data, status=200)
