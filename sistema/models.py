from django.db import models
from django.contrib.auth.models import User
from django.shortcuts import render


class PlanoAcao(models.Model):
    CATEGORIAS = [
        ('matematica', 'Matemática'),
        ('portugues', 'Língua Portuguesa'),
        ('ciencias', 'Ciências'),
        ('historia', 'História'),
        ('geografia', 'Geografia'),
        ('artes', 'Artes'),
        ('educacao-fisica', 'Educação Física'),
        ('multidisciplinar', 'Multidisciplinar'),
    ]

    titulo = models.CharField(max_length=200)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS)
    descricao = models.TextField(max_length=500, blank=True)
    objetivos = models.TextField()
    estrategias = models.TextField()
    recursos = models.TextField(blank=True)
    avaliacao = models.TextField(blank=True)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    rascunho = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo


# -------------------------------------------------------------------
# PERFIL DO USUÁRIO — CAMPOS CORRETOS E SEM DUPLICAÇÃO
# -------------------------------------------------------------------

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Dados pessoais
    phone = models.CharField(max_length=20, blank=True)
    school = models.CharField(max_length=100, blank=True)
    grade = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=100, blank=True)

    # Preferências
    language = models.CharField(max_length=20, default="pt-br")
    timezone = models.CharField(max_length=50, default="America/Sao_Paulo")
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=False)
    newsletter = models.BooleanField(default=True)

    # Foto do perfil
    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)

    # Data de criação
    member_since = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Perfil de {self.user.username}"
from django.db import models

class Plano(models.Model):
    titulo = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)

    # status → usado na dashboard (ex: ativo, concluído etc.)
    status = models.CharField(max_length=20, default="ativo")

    # progresso % → usado na barra de progresso
    progresso = models.IntegerField(default=0)

    # conteúdo gerado pela IA
    descricao = models.TextField(blank=True)
    objetivos = models.TextField(blank=True)
    estrategias = models.TextField(blank=True)
    recursos = models.TextField(blank=True)
    avaliacao = models.TextField(blank=True)
    plano_gerado = models.TextField(blank=True)

    # tags → você usa no HTML, mas não existia no modelo
    tags = models.CharField(max_length=255, blank=True, default="")

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def tag_list(self):
        if not self.tags:
            return []
        return [tag.strip() for tag in self.tags.split(",")]

    def __str__(self):
        return self.titulo
