from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile
from rest_framework.validators import UniqueValidator

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 8},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    resume = serializers.CharField(source="user_profile.resume", required=False)

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=get_user_model().objects.all(), message="Email must be unique!")],
    )

    class Meta:
        model = get_user_model()
        fields = ["username", "email", "first_name", "last_name", "resume"]

    def update(self, instance, validated_data):
        user_profile_data = validated_data.pop("user_profile", {})

        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        user_profile = getattr(instance, "user_profile")
        if user_profile and user_profile_data:
            for attr, value in user_profile_data.items():
                setattr(user_profile, attr, value)
            user_profile.save()

        return instance


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["user", "resume"]
        read_only_fields = ["resume"]
