"""
Django settings for educlink project.
"""

from pathlib import Path
from dotenv import load_dotenv
import os

# Carrega variáveis do arquivo .env
load_dotenv()

# Caminho base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent


# ------------------------
# CONFIGURAÇÕES BÁSICAS
# ------------------------
SECRET_KEY = "django-insecure-f*$%$))*)s$tq+=mcq-(im@!2sx=7t^!r+wq+5im%_h*ya!bx9"
DEBUG = False
ALLOWED_HOSTS = ["*"]


# ------------------------
# APPS
# ------------------------
INSTALLED_APPS = [
    # Django padrão
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
   
    # Allauth
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",

    # Aplicações do projeto
   "sistema.apps.SistemaConfig"
]


# ------------------------
# MIDDLEWARE
# ------------------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",

    # Necessário para allauth
    "allauth.account.middleware.AccountMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ------------------------
# URLS / TEMPLATE ENGINE
# ------------------------
ROOT_URLCONF = "educlink.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates"  # suas telas principais
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",  # allauth
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "educlink.wsgi.application"


# ------------------------
# ALLAUTH (NOVO PADRÃO)
# ------------------------
ACCOUNT_LOGIN_METHODS = {"username", "email"}

ACCOUNT_SIGNUP_FIELDS = [
    "email*",
    "username*",
    "password1*",
    "password2*",
]

SITE_ID = 1

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

LOGIN_REDIRECT_URL = "dashboard"
LOGOUT_REDIRECT_URL = "home"


# ------------------------
# BANCO DE DADOS
# ------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# ------------------------
# VALIDAÇÃO DE SENHAS
# ------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# ------------------------
# INTERNACIONALIZAÇÃO
# ------------------------
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True


# ------------------------
# STATIC FILES
# ------------------------
STATIC_URL = "static/"

STATICFILES_DIRS = [
    BASE_DIR / "sistema" / "static"
]

STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ------------------------
# LOGIN SOCIAL (GOOGLE)
# ------------------------
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APP": {
            "client_id": "<SEU_CLIENT_ID>",
            "secret": "<SEU_CLIENT_SECRET>",
            "key": "",
        },
        "SCOPE": ["profile", "email"],
        "AUTH_PARAMS": {"access_type": "online"},
    }
}


# ------------------------
# IA - OPENROUTER / DEEPSEEK
# ------------------------
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
