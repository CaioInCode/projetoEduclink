from django import forms
from django.contrib.auth.models import User
from .models import PlanoAcao, Profile  # IMPORTAÇÃO CORRETA DO PROFILE

# Atualiza dados do usuário (nome, sobrenome, email)
class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


# Atualiza dados do perfil do usuário
class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = [
            'phone', 'school', 'grade', 'subject',
            'language', 'timezone',
            'email_notifications', 'push_notifications', 'newsletter',
        ]


# Formulário para criar/editar Plano de Ação
class PlanoAcaoForm(forms.ModelForm):
    class Meta:
        model = PlanoAcao
        fields = [
            'titulo', 'categoria', 'descricao',
            'objetivos', 'estrategias', 'recursos', 'avaliacao'
        ]
