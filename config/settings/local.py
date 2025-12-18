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

# CSRF Configuration
CSRF_TRUSTED_ORIGINS = ["http://localhost:8080"]
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SAMESITE = 'Lax'

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://client:3000",
    "http://localhost:8080",
]

# Allowed Hosts
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "api", "jobbee_nginx"]

# Session Configuration (Critical for login through proxy)
SESSION_COOKIE_SECURE = False  # Use True only with HTTPS
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_DOMAIN = None
SESSION_COOKIE_NAME = 'sessionid'

# Domain
DOMAIN = getenv("DOMAIN")
ADMIN_URL = getenv("DJANGO_ADMIN_URL")

# Remove or comment out SECURE_PROXY_SSL_HEADER in local development
# It should only be used in production with actual HTTPS
USE_X_FORWARDED_HOST = True