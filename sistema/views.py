from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
import os
from openai import OpenAI
import markdown as md
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from .forms import UserUpdateForm, ProfileUpdateForm
from .models import Profile, Plano

# ---------------------------------------------------------
#       OPENROUTER API CONFIG
# ---------------------------------------------------------
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

# ===============================================================
#                    PÁGINAS DO SISTEMA
# ===============================================================

def home(request):
    return render(request, 'sistema/base.html')

def login_view(request):
    error = None
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            error = 'Usuário ou senha inválidos'
            messages.error(request, error)
    return render(request, 'sistema/login.html', {'error': error})

def logout_view(request):
    logout(request)
    return redirect("home")

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Usuário já existe')
        else:
            User.objects.create_user(username=username, password=password)
            messages.success(request, 'Usuário criado com sucesso!')
            return redirect('login')

    return render(request, 'sistema/register.html')

def dashboard(request):
    return render(request, 'sistema/dashboard.html')

def novo_plano(request):
    return render(request, 'sistema/novo_plano.html')

# -------------------------------
# LISTAR PLANOS CRIADOS
# -------------------------------
def planoscriados(request):
    planos = Plano.objects.all().order_by("-atualizado_em")

    return render(request, 'sistema/planoscriados.html', {
        "planos": planos,
        "ultima_atualizacao": planos.first().atualizado_em if planos else None,
    })

def favoritos(request):
    return render(request, 'sistema/favoritos.html')

def dados(request):
    return render(request, 'sistema/dados.html')

def historico(request):
    return render(request, 'sistema/historico.html')

def ajuda(request):
    return render(request, 'sistema/ajuda.html')

def plano_criado(request):
    return render(request, 'sistema/plano_criado.html')

def plano_saiba(request):
    return render(request, 'sistema/plano_saiba.html')


# ===============================================================
#                     GERAR PDF COM SESSÃO
# ===============================================================

def gerar_pdf_plano(request):

    plano = request.session.get("ultimo_plano")

    if not plano:
        return HttpResponse("Nenhum plano encontrado para gerar PDF.", status=400)

    try:
        plano_html = md.markdown(plano["plano_gerado"])
    except:
        plano_html = plano["plano_gerado"]

    context = {
        "titulo": plano["titulo"],
        "categoria": plano["categoria"],
        "descricao": plano["descricao"],
        "objetivos": plano["objetivos"],
        "estrategias": plano["estrategias"],
        "recursos": plano["recursos"],
        "avaliacao": plano["avaliacao"],
        "plano_gerado": plano_html,
    }

    template = get_template('sistema/pdf_plano.html')
    html = template.render(context)

    response = HttpResponse(content_type='application/pdf')
    filename = f'plano_{plano["titulo"].replace(" ", "_")}.pdf'
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    pisa_status = pisa.CreatePDF(html, dest=response)
    if pisa_status.err:
        return HttpResponse("Erro ao gerar PDF", status=500)

    return response


# ===============================================================
#                     GERAR PLANO IA
# ===============================================================

def gerar_plano_ia(request):

    if request.method != "POST":
        return redirect("novo_plano")

    # Limpa plano anterior
    request.session.pop("ultimo_plano", None)

    # Dados do formulário
    titulo = request.POST.get("titulo")
    categoria = request.POST.get("categoria")
    descricao = request.POST.get("descricao")
    objetivos = request.POST.get("objetivos")
    estrategias = request.POST.get("estrategias")
    recursos = request.POST.get("recursos")
    avaliacao = request.POST.get("avaliacao")

    prompt = f"""
    Você é um pedagogo especialista em elaboração de planos de aula claros e objetivos.
    Gere um plano completo e muito bem estruturado.
    Título: {titulo}
    Categoria: {categoria}
    Descrição: {descricao}
    Objetivos: {objetivos}
    Estratégias: {estrategias}
    Recursos: {recursos}
    Avaliação: {avaliacao}
    """

    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-chat",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1500
        )
        plano_gerado = completion.choices[0].message.content
        plano_gerado = plano_gerado.replace("#", "").replace("*", "").replace("-", "")

    except Exception as e:
        plano_gerado = f"Erro ao gerar plano com IA: {str(e)}"

    # Salva na sessão
    request.session["ultimo_plano"] = {
        "titulo": titulo,
        "categoria": categoria,
        "descricao": descricao,
        "objetivos": objetivos,
        "estrategias": estrategias,
        "recursos": recursos,
        "avaliacao": avaliacao,
        "plano_gerado": plano_gerado,
    }

    # Salva no banco
    plano = Plano.objects.create(
        titulo=titulo,
        categoria=categoria,
        descricao=descricao,
        objetivos=objetivos,
        estrategias=estrategias,
        recursos=recursos,
        avaliacao=avaliacao,
        plano_gerado=plano_gerado,
        status="ativo",
        progresso=0,
        tags=""
    )

    return render(request, "sistema/plano_criado.html", {
        "plano": plano,
        "titulo": titulo,
        "categoria": categoria,
        "descricao": descricao,
        "objetivos": objetivos,
        "estrategias": estrategias,
        "recursos": recursos,
        "avaliacao": avaliacao,
        "plano_gerado": plano_gerado
    })


# ===============================================================
#                     CONFIGURAÇÕES DO USUÁRIO
# ===============================================================

def config(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == "POST":

        # FOTO
        if "profile_picture" in request.FILES:
            profile.profile_picture = request.FILES["profile_picture"]
            profile.save()
            messages.success(request, "Foto atualizada com sucesso!")
            return redirect("config")

        # DADOS
        if "update_profile" in request.POST:
            user_form = UserUpdateForm(request.POST, instance=user)
            profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=profile)

            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                profile_form.save()
                messages.success(request, "Informações atualizadas com sucesso!")
                return redirect("config")
            else:
                messages.error(request, "Erro ao atualizar informações.")

        # SENHA
        if "change_password" in request.POST:
            password_form = PasswordChangeForm(user, request.POST)

            if password_form.is_valid():
                password_form.save()
                update_session_auth_hash(request, user)
                messages.success(request, "Senha alterada com sucesso!")
                return redirect("config")
            else:
                messages.error(request, "Erro ao alterar a senha.")

    else:
        user_form = UserUpdateForm(instance=user)
        profile_form = ProfileUpdateForm(instance=profile)
        password_form = PasswordChangeForm(user)

    stats = {
        "active_plans": 0,
        "saved_strategies": 0,
        "member_since": profile.member_since,
    }

    return render(request, "sistema/config.html", {
        "user_form": user_form,
        "profile_form": profile_form,
        "password_form": password_form,
        "stats": stats,
        "profile": profile,
    })


# ===============================================================
#                CRUD DOS PLANOS
# ===============================================================

def baixar_plano_pdf(request, plano_id):
    return gerar_pdf_plano(request)
