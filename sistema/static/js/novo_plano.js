class PlanoAcaoManager {
    constructor() {
        this.currentSuggestion = null;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.initCharacterCounter();
    }

    bindEvents() {
        const form = document.getElementById('planoForm');
        const btnDraft = document.getElementById('salvarRascunho');
        const btnEstrat = document.getElementById('sugerirEstrategias');
        const btnRecursos = document.getElementById('sugerirRecursos');
        const btnAval = document.getElementById('sugerirAvaliacao');

        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        if (btnDraft) btnDraft.addEventListener('click', () => this.saveAsDraft());
        if (btnEstrat) btnEstrat.addEventListener('click', () => this.sugerirEstrategias());
        if (btnRecursos) btnRecursos.addEventListener('click', () => this.sugerirRecursos());
        if (btnAval) btnAval.addEventListener('click', () => this.sugerirAvaliacao());

        this.setupRealTimeValidation();
    }

    initCharacterCounter() {
        const descricaoTextarea = document.getElementById('descricao');
        const descricaoCounter = document.getElementById('descricaoCounter');

        if (!descricaoTextarea || !descricaoCounter) return;

        const updateCounter = () => {
            const count = descricaoTextarea.value.length;
            descricaoCounter.textContent = count;

            if (count > 490) {
                descricaoCounter.style.color = '#ef4444';
            } else if (count > 450) {
                descricaoCounter.style.color = '#f59e0b';
            } else {
                descricaoCounter.style.color = '#64748b';
            }
        };

        descricaoTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    setupRealTimeValidation() {
        const requiredFields = document.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field);
                }
            });
        });
    }

    validateField(field) {
        if (!field) return true;

        const errorElement = document.getElementById(field.id + 'Error');
        const rawValue = (field.value || '').toString();

        if (!rawValue.trim()) {
            field.classList.add('error');
            field.classList.remove('success');
            if (errorElement) {
                errorElement.textContent = 'Este campo é obrigatório.';
                errorElement.classList.add('show');
            }
            return false;
        } else {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
            return true;
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // ============================================================
    //                ENVIO CORRETO DO FORMULÁRIO
    // ============================================================
    async handleFormSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        this.showLoading();

        const form = document.getElementById("planoForm");
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData
            });

            // Django retorna HTML → NÃO usar JSON
            const html = await response.text();

            document.open();
            document.write(html);
            document.close();

        } catch (error) {
            this.showToast("Erro inesperado: " + error, "error");
        }

        this.hideLoading();
    }

    // ============================================================
    //                     SALVAR COMO RASCUNHO
    // ============================================================
    async saveAsDraft() {
        const formData = this.getFormData();

        if (!formData.titulo && !formData.objetivos) {
            this.showToast('Adicione pelo menos um título ou objetivo para salvar como rascunho.', 'warning');
            return;
        }

        this.showLoading();

        setTimeout(() => {
            this.hideLoading();

            const drafts = JSON.parse(localStorage.getItem('planos_rascunho') || '[]');
            drafts.push({
                ...formData,
                id: Date.now(),
                status: 'rascunho',
                dataCriacao: new Date().toISOString()
            });
            localStorage.setItem('planos_rascunho', JSON.stringify(drafts));

            this.showToast('Plano salvo como rascunho com sucesso!', 'success');

            setTimeout(() => {
                window.location.href = '/dashboard/';
            }, 1200);
        }, 900);
    }

    getFormData() {
        const safeGet = (id) => document.getElementById(id)?.value || '';

        return {
            titulo: safeGet('titulo'),
            categoria: safeGet('categoria'),
            descricao: safeGet('descricao'),
            objetivos: safeGet('objetivos'),
            estrategias: safeGet('estrategias'),
            recursos: safeGet('recursos'),
            avaliacao: safeGet('avaliacao')
        };
    }

    // ============================================================
    //      SISTEMA DE SUGESTÃO DE IA (LOCAL, NÃO INTEGRADO)
    // ============================================================
    async sugerirEstrategias() {
        const objetivos = document.getElementById('objetivos')?.value;
        const categoria = document.getElementById('categoria')?.value;

        if (!objetivos?.trim()) {
            this.showToast('Preencha os objetivos primeiro.', 'warning');
            return;
        }

        if (!categoria) {
            this.showToast('Selecione uma categoria.', 'warning');
            return;
        }

        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.mostrarSugestao(this.gerarSugestaoEstrategias(objetivos, categoria), 'estrategias');
        }, 1200);
    }

    async sugerirRecursos() {
        const estrategias = document.getElementById('estrategias')?.value;

        if (!estrategias?.trim()) {
            this.showToast('Preencha as estratégias primeiro.', 'warning');
            return;
        }

        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.mostrarSugestao(this.gerarSugestaoRecursos(estrategias), 'recursos');
        }, 1000);
    }

    async sugerirAvaliacao() {
        const objetivos = document.getElementById('objetivos')?.value;

        if (!objetivos?.trim()) {
            this.showToast('Preencha os objetivos primeiro.', 'warning');
            return;
        }

        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.mostrarSugestao(this.gerarSugestaoAvaliacao(objetivos), 'avaliacao');
        }, 1000);
    }

    gerarSugestaoEstrategias(obj, cat) {
        const bases = {
            matematica: [
                'Resolução de problemas contextualizados.',
                'Jogos matemáticos interativos.',
                'Projetos aplicados.',
                'Materiais manipuláveis.'
            ],
            portugues: [
                'Leitura compartilhada com debate.',
                'Produção textual colaborativa.',
                'Estudo de gêneros textuais.',
                'Oficinas de escrita criativa.'
            ]
        };

        const lista = bases[cat] || [
            'Aprendizagem colaborativa.',
            'PBL.',
            'Metodologias ativas.',
            'Diferenciação pedagógica.'
        ];

        return `Estratégias sugeridas:\n\n• ${lista.join('\n• ')}`;
    }

    gerarSugestaoRecursos() {
        return `Recursos sugeridos:\n\n• Materiais impressos\n• Plataformas digitais\n• Recursos audiovisuais\n• Espaços colaborativos`;
    }

    gerarSugestaoAvaliacao() {
        return `Sugestões de avaliação:\n\n• Avaliação formativa\n• Rubricas\n• Autoavaliação\n• Portfólios`;
    }

    mostrarSugestao(texto, tipo) {
        const el = document.getElementById(tipo);
        if (el) el.value = texto;
        this.showToast('Sugestão aplicada!', 'success');
    }

    // ============================================================
    //                     SISTEMA DE TOAST
    // ============================================================
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        toast.querySelector('.toast-close').onclick = () => toast.remove();

        setTimeout(() => toast.remove(), 4000);
    }

    showLoading() {
        document.getElementById('loadingOverlay')?.classList.add('show');
    }

    hideLoading() {
        document.getElementById('loadingOverlay')?.classList.remove('show');
    }
}

const planoManager = new PlanoAcaoManager();
window.planoManager = planoManager;
