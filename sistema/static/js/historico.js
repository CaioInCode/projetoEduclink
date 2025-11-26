const comparisonData = {
            evolution: {
                labels: ['1º Tri', '2º Tri', '3º Tri'],
                math: [6.8, 7.2, 7.8],
                portuguese: [7.5, 7.8, 7.3],
                science: [7.2, 7.5, 7.9],
                history: [6.9, 7.1, 7.4]
            },
            currentPeriod: {
                math: 7.8,
                portuguese: 7.3,
                science: 7.9,
                history: 7.4,
                frequency: 94,
                participation: 76,
                completion: 88
            },
            previousPeriod: {
                math: 7.2,
                portuguese: 7.8,
                science: 7.5,
                history: 7.1,
                frequency: 92,
                participation: 72,
                completion: 85
            },
            insights: [
                {
                    type: 'success',
                    icon: 'fas fa-chart-line',
                    title: 'Crescimento em Matemática',
                    description: 'A disciplina apresentou crescimento de 8.3% no período atual.'
                },
                {
                    type: 'warning',
                    icon: 'fas fa-exclamation-triangle',
                    title: 'Queda em Língua Portuguesa',
                    description: 'Redução de 6.4% no desempenho comparado ao período anterior.'
                },
                {
                    type: 'info',
                    icon: 'fas fa-users',
                    title: 'Melhora na Participação',
                    description: 'Aumento de 5.6% no engajamento dos estudantes.'
                }
            ]
        };

        // Elementos do DOM
        const evolutionChartCtx = document.getElementById('evolutionChart');
        const comparisonChartCtx = document.getElementById('comparisonChart');
        const comparativeMetrics = document.getElementById('comparativeMetrics');
        const comparisonTableBody = document.getElementById('comparisonTableBody');
        const insightsList = document.getElementById('insightsList');
        const applyFiltersBtn = document.getElementById('applyFilters');
        const resetFiltersBtn = document.getElementById('resetFilters');

        // Inicializar gráficos
        let evolutionChart, comparisonChart;

        function initializeCharts() {
            // Gráfico de Evolução
            if (evolutionChartCtx) {
                evolutionChart = new Chart(evolutionChartCtx, {
                    type: 'line',
                    data: {
                        labels: comparisonData.evolution.labels,
                        datasets: [
                            {
                                label: 'Matemática',
                                data: comparisonData.evolution.math,
                                borderColor: '#3751ff',
                                backgroundColor: 'rgba(55, 81, 255, 0.1)',
                                tension: 0.4,
                                fill: true
                            },
                            {
                                label: 'Português',
                                data: comparisonData.evolution.portuguese,
                                borderColor: '#16a34a',
                                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                tension: 0.4,
                                fill: true
                            },
                            {
                                label: 'Ciências',
                                data: comparisonData.evolution.science,
                                borderColor: '#f59e0b',
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                tension: 0.4,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Evolução das Médias por Disciplina'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 6,
                                max: 8.5,
                                title: {
                                    display: true,
                                    text: 'Média'
                                }
                            }
                        }
                    }
                });
            }

            // Gráfico de Comparação
            if (comparisonChartCtx) {
                comparisonChart = new Chart(comparisonChartCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Matemática', 'Português', 'Ciências', 'História'],
                        datasets: [
                            {
                                label: 'Período Atual',
                                data: [
                                    comparisonData.currentPeriod.math,
                                    comparisonData.currentPeriod.portuguese,
                                    comparisonData.currentPeriod.science,
                                    comparisonData.currentPeriod.history
                                ],
                                backgroundColor: 'rgba(55, 81, 255, 0.8)',
                                borderColor: '#3751ff',
                                borderWidth: 1
                            },
                            {
                                label: 'Período Anterior',
                                data: [
                                    comparisonData.previousPeriod.math,
                                    comparisonData.previousPeriod.portuguese,
                                    comparisonData.previousPeriod.science,
                                    comparisonData.previousPeriod.history
                                ],
                                backgroundColor: 'rgba(107, 114, 128, 0.6)',
                                borderColor: '#6b7280',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Comparação de Desempenho por Disciplina'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 6,
                                max: 8.5,
                                title: {
                                    display: true,
                                    text: 'Média'
                                }
                            }
                        }
                    }
                });
            }
        }

        // Carregar métricas comparativas
        function loadComparativeMetrics() {
            if (comparativeMetrics) {
                const metrics = [
                    {
                        label: 'Média Geral',
                        current: 7.6,
                        previous: 7.4,
                        change: 0.2
                    },
                    {
                        label: 'Frequência',
                        current: comparisonData.currentPeriod.frequency,
                        previous: comparisonData.previousPeriod.frequency,
                        change: comparisonData.currentPeriod.frequency - comparisonData.previousPeriod.frequency
                    },
                    {
                        label: 'Participação',
                        current: comparisonData.currentPeriod.participation,
                        previous: comparisonData.previousPeriod.participation,
                        change: comparisonData.currentPeriod.participation - comparisonData.previousPeriod.participation
                    },
                    {
                        label: 'Taxa de Entrega',
                        current: comparisonData.currentPeriod.completion,
                        previous: comparisonData.previousPeriod.completion,
                        change: comparisonData.currentPeriod.completion - comparisonData.previousPeriod.completion
                    }
                ];

                comparativeMetrics.innerHTML = metrics.map(metric => {
                    const change = metric.change;
                    const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
                    const changeIcon = change > 0 ? 'fas fa-arrow-up' : change < 0 ? 'fas fa-arrow-down' : 'fas fa-minus';
                    const changeText = change > 0 ? `+${change}` : change;

                    return `
                        <div class="metric-card">
                            <div class="metric-value ${changeClass}">${metric.current}</div>
                            <div class="metric-label">${metric.label}</div>
                            <div class="metric-change ${change > 0 ? 'change-positive' : change < 0 ? 'change-negative' : ''}">
                                <i class="${changeIcon}"></i>
                                ${changeText}%
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Carregar tabela comparativa
        function loadComparisonTable() {
            if (comparisonTableBody) {
                const subjects = [
                    { name: 'Matemática', current: comparisonData.currentPeriod.math, previous: comparisonData.previousPeriod.math },
                    { name: 'Português', current: comparisonData.currentPeriod.portuguese, previous: comparisonData.previousPeriod.portuguese },
                    { name: 'Ciências', current: comparisonData.currentPeriod.science, previous: comparisonData.previousPeriod.science },
                    { name: 'História', current: comparisonData.currentPeriod.history, previous: comparisonData.previousPeriod.history }
                ];

                comparisonTableBody.innerHTML = subjects.map(subject => {
                    const change = subject.current - subject.previous;
                    const changePercent = ((change / subject.previous) * 100).toFixed(1);
                    const trendClass = change > 0 ? 'trend-up' : change < 0 ? 'trend-down' : 'trend-stable';
                    const trendIcon = change > 0 ? 'fas fa-arrow-up' : change < 0 ? 'fas fa-arrow-down' : 'fas fa-minus';

                    return `
                        <tr>
                            <td>${subject.name}</td>
                            <td>${subject.current}</td>
                            <td>${subject.previous}</td>
                            <td>
                                <div class="trend-indicator ${trendClass}">
                                    <i class="${trendIcon}"></i>
                                    ${change > 0 ? '+' : ''}${changePercent}%
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }

        // Carregar insights
        function loadInsights() {
            if (insightsList) {
                insightsList.innerHTML = comparisonData.insights.map(insight => `
                    <div class="insight-item ${insight.type}">
                        <div class="insight-icon">
                            <i class="${insight.icon}"></i>
                        </div>
                        <div class="insight-content">
                            <h4>${insight.title}</h4>
                            <p>${insight.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Eventos dos filtros
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                const classSelect = document.getElementById('classSelect');
                const subjectSelect = document.getElementById('subjectSelect');
                const indicatorSelect = document.getElementById('indicatorSelect');
                const periodSelect = document.getElementById('periodSelect');

                // Simular carregamento de novos dados baseado nos filtros
                showLoading();
                
                setTimeout(() => {
                    // Em uma aplicação real, aqui você faria uma requisição AJAX
                    // para buscar dados filtrados do servidor
                    updateChartsWithFilteredData();
                    hideLoading();
                    alert('Análise atualizada com os filtros aplicados!');
                }, 1000);
            });
        }

        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                document.getElementById('classSelect').value = '7a';
                document.getElementById('subjectSelect').value = 'math';
                document.getElementById('indicatorSelect').value = 'frequency';
                document.getElementById('periodSelect').value = 'quarterly';
                
                // Restaurar dados originais
                updateChartsWithFilteredData();
                alert('Filtros restaurados para os valores padrão!');
            });
        }

        // Funções auxiliares
        function showLoading() {
            // Em uma aplicação real, você mostraria um indicador de carregamento
            console.log('Carregando dados...');
        }

        function hideLoading() {
            console.log('Dados carregados!');
        }

        function updateChartsWithFilteredData() {
            // Em uma aplicação real, você atualizaria os gráficos com dados filtrados
            // Por enquanto, vamos apenas recarregar os dados existentes
            loadComparativeMetrics();
            loadComparisonTable();
            loadInsights();
        }

        // Inicializar a página
        document.addEventListener('DOMContentLoaded', () => {
            initializeCharts();
            loadComparativeMetrics();
            loadComparisonTable();
            loadInsights();
        });

        // Função para exportar dados
        function exportData() {
            const dataStr = JSON.stringify(comparisonData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'historico-comparativo.json';
            link.click();
            URL.revokeObjectURL(url);
        }

        // Adicionar evento de exportação
        document.addEventListener('click', (e) => {
            if (e.target.closest('.icon-btn') && e.target.closest('.icon-btn').querySelector('.fa-download')) {
                exportData();
            }
        });