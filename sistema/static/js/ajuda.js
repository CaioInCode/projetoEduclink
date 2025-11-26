const faqData = [
            {
                question: "Como criar um plano de ação?",
                answer: "Vá para 'Planos Ativos' > Clique em 'Novo Plano' > Preencha as informações > Salve."
            },
            {
                question: "Como adicionar uma nova turma?",
                answer: "Acesse 'Registro de Dados' > Clique em 'Nova Turma' > Preencha os dados da turma > Confirme."
            },
            {
                question: "Como importar dados de alunos?",
                answer: "Use o template CSV disponível > Preencha os dados > Faça upload na seção 'Registro de Dados'."
            },
            {
                question: "Como gerar relatórios?",
                answer: "Selecione a turma e período desejado > Clique em 'Gerar Relatório' > Escolha o formato de exportação."
            },
            {
                question: "Esqueci minha senha, o que fazer?",
                answer: "Clique em 'Esqueci senha' na tela de login > Siga as instruções no email > Crie uma nova senha."
            }
        ];

        // Elementos do DOM
        const faqList = document.getElementById('faqList');
        const helpSearch = document.getElementById('helpSearch');

        // Carregar FAQ
        function loadFAQ() {
            if (faqList) {
                faqList.innerHTML = faqData.map((faq, index) => `
                    <div class="faq-item" id="faq-${index}">
                        <div class="faq-question" onclick="toggleFAQ(${index})">
                            <h4>${faq.question}</h4>
                            <i class="fas fa-chevron-down faq-icon"></i>
                        </div>
                        <div class="faq-answer" id="faq-answer-${index}">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Funções de interação
        function toggleFAQ(index) {
            const faqItem = document.getElementById(`faq-${index}`);
            const faqAnswer = document.getElementById(`faq-answer-${index}`);
            
            // Fechar todos os outros FAQs
            document.querySelectorAll('.faq-answer').forEach((answer, i) => {
                if (i !== index) {
                    answer.classList.remove('active');
                    document.getElementById(`faq-${i}`).classList.remove('active');
                }
            });
            
            // Alternar o atual
            faqAnswer.classList.toggle('active');
            faqItem.classList.toggle('active');
        }

        function searchHelp() {
            const query = helpSearch.value.trim();
            if (query) {
                // Busca simples nos dados do FAQ
                const results = faqData.filter(faq => 
                    faq.question.toLowerCase().includes(query.toLowerCase()) || 
                    faq.answer.toLowerCase().includes(query.toLowerCase())
                );
                
                if (results.length > 0) {
                    // Mostrar primeiro resultado
                    const index = faqData.findIndex(faq => faq === results[0]);
                    if (index !== -1) {
                        scrollToFAQ();
                        setTimeout(() => {
                            // Fechar todos primeiro
                            document.querySelectorAll('.faq-answer').forEach(answer => {
                                answer.classList.remove('active');
                            });
                            document.querySelectorAll('.faq-item').forEach(item => {
                                item.classList.remove('active');
                            });
                            
                            // Abrir o resultado encontrado
                            toggleFAQ(index);
                        }, 500);
                    }
                } else {
                    alert(`Nenhum resultado encontrado para "${query}". Tente termos diferentes ou entre em contato com o suporte.`);
                }
            } else {
                alert('Por favor, digite sua dúvida na barra de pesquisa.');
            }
        }

        function scrollToFAQ() {
            document.getElementById('faqSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }

        function showGuides() {
            alert('Abrindo guias rápidos...\n\nEm uma implementação completa, esta função abriria uma página com tutoriais em texto.');
        }

        function showContactOptions() {
            alert('Opções de contato:\n\n📧 Email: suporte@educlink.com.br\n📞 Telefone: (11) 3456-7890\n💬 WhatsApp: (11) 98765-4321\n\nHorário de atendimento: Segunda a Sexta, 8h às 18h');
        }

        function openContactForm() {
            alert('Abrindo formulário de contato...\n\nEm uma implementação completa, esta função abriria um formulário para enviar mensagem direta ao suporte.');
        }

        function showSystemDetails() {
            alert('Status do Sistema - EDUCLINK\n\n✅ Plataforma Web: Operacional\n✅ Banco de Dados: Operacional\n✅ Serviço de Email: Operacional\n✅ API: Operacional\n\nTodos os sistemas estão funcionando normalmente.');
        }

        // Permitir busca com Enter
        if (helpSearch) {
            helpSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchHelp();
                }
            });
        }

        // Inicializar a página
        document.addEventListener('DOMContentLoaded', () => {
            loadFAQ();
        });