from .base import *  # noqa
from .base import BASE_DIR
from os import path, getenv
from dotenv import load_dotenv


local_env_file = path.join(BASE_DIR, ".envs", ".env.local")

if path.isfile(local_env_file):
    load_dotenv(local_env_file)

 
SECURITY_KEY = getenv("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

ADMIN_URL = getenv("ADMIN_URL")

DOMAIN = getenv("DOMAIN")