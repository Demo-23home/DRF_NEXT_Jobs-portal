from rest_framework import serializers
from .models import Job, CandidatesApplied
from django.utils import timezone


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class CandidatesAppliedSerializer(serializers.ModelSerializer):
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all())    
    class Meta:
        model = CandidatesApplied
        fields = (
            "user",
            "resume",
            "applied_at",
            "job",
        )
        read_only_fields = (
            "user",
            "resume",
            "applied_at",
        )

    def validate_job(self, job):
        request = self.context["request"]
        user = request.user

        # Deadline check
        if job.last_date < timezone.now():
            raise serializers.ValidationError(
                "The deadline for this has already passed!."
            )

        # Duplicate Application check
        if CandidatesApplied.objects.filter(user=user, job=job).exists():
            raise serializers.ValidationError("You have already applied for this job!.")

        return job

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user

        # Resume existences check
        if not hasattr(user, "user_profile") or not user.user_profile.resume:
            raise serializers.ValidationError(
                "You have to upload a resume before applying for this job!."
            )

        resume_url = user.user_profile.resume
        job = validated_data["job"]

        application = CandidatesApplied.objects.create(
            user=user, job=job, resume=resume_url
        )

        return application
