from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
# Create your models here.


User = get_user_model()

class UserProfile(models.Model): 
    user = models.OneToOneField(User, verbose_name=_("User"), on_delete=models.CASCADE, related_name="user_profile")
    resume = models.FileField(_("Resume"), upload_to=None, max_length=100, null=True)
