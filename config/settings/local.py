from .base import *  # noqa
from .base import BASE_DIR
from os import path, getenv
from dotenv import load_dotenv


local_env_file = path.join(BASE_DIR, ".envs", ".env.local")

if path.isfile(local_env_file):
    load_dotenv(local_env_file)

DEBUG = True

SECRET_KEY = getenv("DJANGO_SECRET_KEY", "TABl6_TpFit2mi8aNiNv3F23pVdQ9Z09-unNtlfLWNlGavBI5kM")

CSRF_TRUSTED_ORIGINS = ["http://localhost:8080"]

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

ADMIN_URL = getenv("ADMIN_URL")

DOMAIN = getenv("DOMAIN")