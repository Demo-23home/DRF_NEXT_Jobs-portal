from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, SignUpSerializer
from django.contrib.auth import get_user_model
from rest_framework import status

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
