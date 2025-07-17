from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point
import datetime
from django.contrib.auth.models import User
import geocoder, os


class JobTypes(models.TextChoices):
    Permanent = "Permanent"
    Temporary = "Temporary"
    Internship = "Internship"


class Education(models.TextChoices):
    Bachelors = "Bachelors"
    Masters = "Masters"
    Phd = "Phd"


class Industry(models.TextChoices):
    Business = "Business"
    IT = "IT"
    Banking = "Banking"
    Education = "Education"
    Telecommunication = "Telecommunication"
    Others = "Others"


class Experience(models.TextChoices):
    NO_EXPERIENCE = "No experience"
    ONE_YEAR = "1 Year"
    TO_YEAR = "2 Year"
    THREE_YEAR_PLUS = "3 Year above"


def return_date_time():
    now = datetime.datetime.now()
    date = now + datetime.timedelta(days=10)
    return date


class Job(models.Model):
    title = models.CharField(_("Title"), max_length=50)
    description = models.TextField(_("Description"))
    email = models.EmailField(_("Email"), max_length=254)
    address = models.CharField(_("Address"), max_length=50)
    job_type = models.CharField(
        _("Job Type"), max_length=50, choices=JobTypes.choices, default=JobTypes.Permanent
    )
    education = models.CharField(
        _("Education"), max_length=50, choices=Education.choices, default=Education.Bachelors
    )
    industry = models.CharField(
        _("Industry"), max_length=50, choices=Industry.choices, default=Industry.Business
    )
    experience = models.CharField(
        _("Experience"),
        max_length=50,
        choices=Experience.choices,
        default=Experience.NO_EXPERIENCE,
    )
    salary = models.PositiveIntegerField(
        _("Salary"), default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)]
    )
    positions = models.PositiveIntegerField(_("Positions"), default=1)
    company = models.CharField(_("Company"), max_length=50, null=True)
    point = gismodels.PointField(default=Point(0.0, 0.0))
    last_date = models.DateTimeField(_("Last Date"), default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def save(self, *args, **kwargs): 
        g = geocoder.opencage(self.address, key=os.environ.get("GEOCODER_API"))
        print(g)
        lng = g.lng 
        lat = g.lat 
        
        self.point = Point(lng, lat)
        super(Job, self).save(*args, **kwargs)  
        
    def __str__(self):
        return f"{self.title}"
    
    
class CandidatesApplied(models.Model): 
    user = models.ForeignKey(User, verbose_name=_("User"), on_delete=models.CASCADE)
    job = models.ForeignKey(Job, verbose_name=_("Job"), on_delete=models.CASCADE)
    resume = models.URLField(_("Resume"), max_length=200)
    applied_at = models.DateTimeField(_("Applied At"), auto_now_add=True)