import cloudinary.uploader
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, SignUpSerializer
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
import cloudinary
from rest_framework.parsers import MultiPartParser, FormParser
import os
from .serializers import ProfileSerializer

User = get_user_model()


@api_view(["POST"])
def sign_up(request):
    data = request.data

    serializer = SignUpSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        if not User.objects.filter(email=data["email"]).exists():
            user = serializer.save()
            user_data = UserSerializer(user).data
            return Response({"user": user_data}, status=status.HTTP_201_CREATED)
        else:
            return Response("A user with this email already exists!")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data
    serializer = UserSerializer(user, data=data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({"message": serializer.data})
    return Response(serializer.errors, status=400)


class ResumeUploader(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [FormParser, MultiPartParser]
    ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get("resume")
        if not file:
            return Response("Resume isn't uploaded!!", status=400)

        file_ext = os.path.splitext(file.name)[1].lower()

        if file_ext not in self.ALLOWED_EXTENSIONS:
            return Response(
                "The file extension is not allowed try: {pdf, doc, docx} ", status=400
            )

        try:
            username = request.user.username
            result = cloudinary.uploader.upload(
                file, source_type="raw", public_id=f"{username}_resume", overwrite=True, type="upload"
            )
            profile = request.user.user_profile
            profile.resume = result["secure_url"]
            profile.save()
            return Response(
                {
                    "message": "Resume Uploaded Successfully",
                    "resume": profile.resume,
                },
                status=200,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=400)
