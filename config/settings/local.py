from .base import *  # noqa
from .base import BASE_DIR
from os import path, getenv
from dotenv import load_dotenv


local_env_file = path.join(BASE_DIR, ".envs", ".env.local")

if path.isfile(local_env_file):
    load_dotenv(local_env_file)

DEBUG = True

SECRET_KEY = getenv(
    "DJANGO_SECRET_KEY", "TABl6_TpFit2mi8aNiNv3F23pVdQ9Z09-unNtlfLWNlGavBI5kM"
)

CSRF_TRUSTED_ORIGINS = ["http://localhost:8080"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://client:3000",
]

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "api"]

DOMAIN = getenv("DOMAIN")

ADMIN_URL = getenv("DJANGO_ADMIN_URL")
