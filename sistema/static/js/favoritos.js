const favoriteStrategies = [
            {
                id: 1,
                title: "Mapa Mental para Aprendizagem",
                category: "Metodologia Ativa",
                description: "Técnica de organização de ideias que facilita a compreensão de conceitos complexos.",
                author: "Prof. Silva",
                likes: 24,
                saves: 12,
                isFavorite: true
            },
            {
                id: 2,
                title: "Sala de Aula Invertida",
                category: "Metodologia",
                description: "Os estudantes estudam o conteúdo em casa e realizam atividades práticas em sala.",
                author: "Prof. Oliveira",
                likes: 18,
                saves: 8,
                isFavorite: true
            },
            {
                id: 3,
                title: "Avaliação por Rubricas",
                category: "Avaliação",
                description: "Sistema de avaliação transparente com critérios bem definidos para os estudantes.",
                author: "Prof. Costa",
                likes: 32,
                saves: 15,
                isFavorite: true
            }
        ];

        const communityStrategies = [
            {
                id: 4,
                title: "Gamificação em História",
                category: "Interdisciplinar",
                description: "Uso de elementos de jogos para ensinar conteúdos históricos de forma engajadora.",
                author: "Prof. Santos",
                likes: 42,
                saves: 21,
                isFavorite: false
            },
            {
                id: 5,
                title: "Aprendizagem Baseada em Projetos",
                category: "Metodologia Ativa",
                description: "Os alunos aprendem através da elaboração de projetos que resolvem problemas reais.",
                author: "Prof. Lima",
                likes: 56,
                saves: 28,
                isFavorite: false
            },
            {
                id: 6,
                title: "Rotação por Estações",
                category: "Metodologia",
                description: "Os alunos circulam por diferentes estações de trabalho com atividades variadas.",
                author: "Prof. Rocha",
                likes: 29,
                saves: 14,
                isFavorite: false
            },
            {
                id: 7,
                title: "Peer Instruction",
                category: "Metodologia",
                description: "Os alunos discutem conceitos em pequenos grupos para consolidar a aprendizagem.",
                author: "Prof. Almeida",
                likes: 37,
                saves: 19,
                isFavorite: false
            }
        ];

        // Função para criar o HTML de uma estratégia
        function createStrategyHTML(strategy, type) {
            return `
                <div class="strategy-card ${type}">
                    <div class="strategy-header">
                        <div>
                            <h3 class="strategy-title">${strategy.title}</h3>
                            <span class="strategy-category">${strategy.category}</span>
                        </div>
                        <button class="favorite-btn" data-id="${strategy.id}">
                            <i class="${strategy.isFavorite ? 'fas' : 'far'} fa-star"></i>
                        </button>
                    </div>
                    <p class="strategy-description">${strategy.description}</p>
                    <div class="strategy-meta">
                        <div class="strategy-author">
                            <div class="author-avatar">${strategy.author.split(' ').map(n => n[0]).join('')}</div>
                            <span>${strategy.author}</span>
                        </div>
                        <div class="strategy-stats">
                            <div class="stat">
                                <i class="fas fa-heart"></i>
                                <span>${strategy.likes}</span>
                            </div>
                            <div class="stat">
                                <i class="fas fa-bookmark"></i>
                                <span>${strategy.saves}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Função para carregar as estratégias na página
        function loadStrategies() {
            const favoritesGrid = document.getElementById('favoritesGrid');
            const communityGrid = document.getElementById('communityGrid');

            // Verifica se há estratégias favoritas
            if (favoriteStrategies.length === 0) {
                favoritesGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="far fa-star"></i>
                        <h3>Nenhuma estratégia favorita</h3>
                        <p>Você ainda não favoritou nenhuma estratégia.</p>
                        <button class="btn btn-primary">Explorar Estratégias</button>
                    </div>
                `;
            } else {
                favoritesGrid.innerHTML = favoriteStrategies.map(strategy => 
                    createStrategyHTML(strategy, 'favorite')
                ).join('');
            }

            // Verifica se há estratégias da comunidade
            if (communityStrategies.length === 0) {
                communityGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>Nenhuma estratégia da comunidade</h3>
                        <p>Não há estratégias disponíveis da comunidade no momento.</p>
                    </div>
                `;
            } else {
                communityGrid.innerHTML = communityStrategies.map(strategy => 
                    createStrategyHTML(strategy, 'community')
                ).join('');
            }

            // Adiciona eventos aos botões de favorito
            document.querySelectorAll('.favorite-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    toggleFavorite(id, this);
                });
            });
        }

        // Função para alternar o status de favorito
        function toggleFavorite(id, button) {
            // Encontrar a estratégia em qualquer uma das listas
            let strategy = favoriteStrategies.find(s => s.id === id) || 
                          communityStrategies.find(s => s.id === id);
            
            if (strategy) {
                strategy.isFavorite = !strategy.isFavorite;
                
                // Atualizar o ícone
                const icon = button.querySelector('i');
                if (strategy.isFavorite) {
                    icon.className = 'fas fa-star';
                    button.parentElement.parentElement.classList.add('favorite');
                } else {
                    icon.className = 'far fa-star';
                    button.parentElement.parentElement.classList.remove('favorite');
                }
                
                // Recarregar as estratégias para atualizar as listas
                loadStrategies();
            }
        }

        // Adiciona eventos aos filtros
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove a classe active de todas as abas
                document.querySelectorAll('.filter-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Adiciona a classe active à aba clicada
                this.classList.add('active');
                
                // Aqui você implementaria a lógica de filtragem real
                // Por simplicidade, vamos apenas recarregar as estratégias
                loadStrategies();
            });
        });

        // Adiciona evento à barra de busca
        document.querySelector('.search-bar input').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Filtra as estratégias favoritas
            const filteredFavorites = favoriteStrategies.filter(strategy => 
                strategy.title.toLowerCase().includes(searchTerm) ||
                strategy.category.toLowerCase().includes(searchTerm) ||
                strategy.author.toLowerCase().includes(searchTerm)
            );
            
            // Filtra as estratégias da comunidade
            const filteredCommunity = communityStrategies.filter(strategy => 
                strategy.title.toLowerCase().includes(searchTerm) ||
                strategy.category.toLowerCase().includes(searchTerm) ||
                strategy.author.toLowerCase().includes(searchTerm)
            );
            
            // Atualiza as grades com os resultados filtrados
            updateGrids(filteredFavorites, filteredCommunity);
        });

        // Função para atualizar as grades com estratégias filtradas
        function updateGrids(favorites, community) {
            const favoritesGrid = document.getElementById('favoritesGrid');
            const communityGrid = document.getElementById('communityGrid');
            
            if (favorites.length === 0) {
                favoritesGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="far fa-star"></i>
                        <h3>Nenhum resultado encontrado</h3>
                        <p>Tente ajustar os termos da sua busca.</p>
                    </div>
                `;
            } else {
                favoritesGrid.innerHTML = favorites.map(strategy => 
                    createStrategyHTML(strategy, 'favorite')
                ).join('');
            }
            
            if (community.length === 0) {
                communityGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>Nenhum resultado encontrado</h3>
                        <p>Tente ajustar os termos da sua busca.</p>
                    </div>
                `;
            } else {
                communityGrid.innerHTML = community.map(strategy => 
                    createStrategyHTML(strategy, 'community')
                ).join('');
            }
            
            // Reaplica os eventos aos botões de favorito
            document.querySelectorAll('.favorite-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    toggleFavorite(id, this);
                });
            });
        }

        // Carrega as estratégias quando a página é carregada
        document.addEventListener('DOMContentLoaded', loadStrategies);