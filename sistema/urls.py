from django.urls import path
from . import views

urlpatterns = [

    # ---------------------------
    # Páginas principais
    # ---------------------------
    path('', views.dashboard, name='dashboard'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),

    # ---------------------------
    # Menu do sistema
    # ---------------------------
    path('dashboard/', views.dashboard, name='dashboard'),
    path('novo-plano/', views.novo_plano, name='novo_plano'),
    path('planos-criados/', views.planoscriados, name='planoscriados'),
    path('favoritos/', views.favoritos, name='favoritos'),
    path('dados/', views.dados, name='dados'),
    path('historico/', views.historico, name='historico'),
    path('ajuda/', views.ajuda, name='ajuda'),
    path('config/', views.config, name='config'),

    # ---------------------------
    # Plano criado + PDF
    # ---------------------------
    path('plano-criado/', views.plano_criado, name='plano_criado'),
    path('plano-saiba/', views.plano_saiba, name='plano_saiba'),
    path('gerar-pdf/', views.gerar_pdf_plano, name='gerar_pdf_plano'),

    # ---------------------------
    # IA - geração de planos
    # ---------------------------
    path('gerar-plano-ia/', views.gerar_plano_ia, name='gerar_plano_ia'),

    # ---------------------------
    # CRUD dos planos
    # ---------------------------
    path('plano/<int:plano_id>/editar/', views.editar_plano, name='editar_plano'),
    path('plano/<int:plano_id>/excluir/', views.excluir_plano, name='excluir_plano'),
    path('plano/<int:plano_id>/pdf/', views.baixar_plano_pdf, name='baixar_plano_pdf'),

    
]