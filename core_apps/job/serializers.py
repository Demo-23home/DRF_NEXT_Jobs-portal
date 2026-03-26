from rest_framework import serializers
from .models import Job, CandidatesApplied
from django.utils import timezone


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"

    def create(self, validated_data):
        user = self.context["request"].user
        return Job.objects.create(user=user, **validated_data)


class CandidatesAppliedWriteSerializer(serializers.ModelSerializer):
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all())

    class Meta:
        model = CandidatesApplied
        fields = ("user", "resume", "applied_at", "job")
        read_only_fields = ("user", "resume", "applied_at")

    def validate_job(self, job):
        request = self.context["request"]
        user = request.user

        if job.last_date < timezone.now():
            raise serializers.ValidationError(
                "The deadline for this job has already passed."
            )

        if CandidatesApplied.objects.filter(user=user, job=job).exists():
            raise serializers.ValidationError("You have already applied for this job.")

        return job

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user

        if not hasattr(user, "user_profile") or not user.user_profile.resume:
            raise serializers.ValidationError(
                {"error": "You have to upload a resume before applying for this job."}
            )

        resume_url = user.user_profile.resume
        job = validated_data["job"]

        return CandidatesApplied.objects.create(user=user, job=job, resume=resume_url)


class CandidatesAppliedReadSerializer(serializers.ModelSerializer):
    job = JobSerializer()  # nested, full job object

    class Meta:
        model = CandidatesApplied
        fields = ("user", "resume", "applied_at", "job")

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user

        if not hasattr(user, "user_profile") or not user.user_profile.resume:
            raise serializers.ValidationError(
                {"error": "You have to upload a resume before applying for this job."}
            )

        resume_url = user.user_profile.resume
        job = validated_data["job"]

        return CandidatesApplied.objects.create(user=user, job=job, resume=resume_url)
