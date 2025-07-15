from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]

        extra_kwargs = {
            "password": {"required": True, "min_length": 6},
            "email": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def create(self, *args, **kwargs):
        data = self.validated_data
        password = data.pop("password")

        user = User.objects.create(
            email=data["email"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            username=data["username"],
        )
        user.password = make_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    resume = serializers.CharField(source="user_profile.resume", required=False)

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
