from django.contrib import admin
from django.urls import path, include
from sistema import views
from sistema.views import gerar_pdf_plano
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),  # necessário para login social
    path('', include('sistema.urls')),
    path("gerar_plano_ia/", views.gerar_plano_ia, name="gerar_plano_ia"),
    path('gerar_pdf/', views.gerar_pdf_plano, name='gerar_pdf_plano'),
    path("", views.planoscriados, name="lista"),

    # CRIAR PLANO
    path("novo/", views.novo_plano, name="novo"),

    # VISUALIZAR PLANO ESPECÍFICO
    path("<int:plano_id>/", views.ver_plano, name="ver"),

    # EDITAR PLANO
    path("<int:plano_id>/editar/", views.editar_plano, name="editar"),

    # GERAR PDF DO PLANO
    path("<int:plano_id>/pdf/", views.gerar_pdf_plano, name="pdf"),
]

