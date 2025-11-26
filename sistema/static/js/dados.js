const indicators = [
    { id: 1, title: 'Alunos Ativos', value: '28', icon: 'fas fa-user-graduate', active: true },
    { id: 2, title: 'Frequência', value: '94%', icon: 'fas fa-calendar-check', active: true },
    { id: 3, title: 'Aprovação', value: '82%', icon: 'fas fa-chart-line', active: true },
    { id: 4, title: 'Nota Média', value: '7.8', icon: 'fas fa-star', active: true },
    { id: 5, title: 'Participação', value: '76%', icon: 'fas fa-comments', active: false },
    { id: 6, title: 'Entregas', value: '88%', icon: 'fas fa-tasks', active: true }
];

const activeClasses = [
    { id: 1, name: '7º Ano A', year: '7º Ano', students: 28, lastUpdate: '15/10/2023' },
    { id: 2, name: '8º Ano B', year: '8º Ano', students: 32, lastUpdate: '12/10/2023' },
    { id: 3, name: '9º Ano A', year: '9º Ano', students: 30, lastUpdate: '10/10/2023' }
];

const updateHistory = [
    { id: 1, title: 'Dados de frequência atualizados', class: '7º Ano A', date: 'Hoje, 14:30', icon: 'fas fa-calendar-alt' },
    { id: 2, title: 'Resultados de avaliação adicionados', class: '8º Ano B', date: 'Ontem, 16:45', icon: 'fas fa-chart-bar' },
    { id: 3, title: 'Observações de comportamento registradas', class: '9º Ano A', date: '15/10/2023, 09:20', icon: 'fas fa-clipboard-list' },
    { id: 4, title: 'Nova turma cadastrada', class: '6º Ano C', date: '14/10/2023, 11:15', icon: 'fas fa-users' }
];

// Elementos do DOM
const indicatorsGrid = document.getElementById('indicatorsGrid');
const classesList = document.getElementById('classesList');
const historyList = document.getElementById('historyList');
const classSelect = document.getElementById('classSelect');
const addClassBtn = document.getElementById('addClassBtn');
const addClassModal = document.getElementById('addClassModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const classForm = document.getElementById('classForm');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const progressFill = document.getElementById('progressFill');
const progressValue = document.getElementById('progressValue');

// Função para carregar indicadores
function loadIndicators() {
    if (indicatorsGrid) {
        indicatorsGrid.innerHTML = indicators.map(indicator => `
            <div class="indicator-card ${indicator.active ? 'active' : ''}">
                <div class="indicator-icon">
                    <i class="${indicator.icon}"></i>
                </div>
                <div class="indicator-title">${indicator.title}</div>
                <div class="indicator-value">${indicator.value}</div>
            </div>
        `).join('');
    }
}

// Função para carregar turmas ativas
function loadClasses() {
    if (classesList) {
        classesList.innerHTML = activeClasses.map(classItem => `
            <div class="class-item">
                <div class="class-info">
                    <h4>${classItem.name}</h4>
                    <div class="class-meta">${classItem.year} • ${classItem.students} alunos</div>
                </div>
                <div class="class-actions">
                    <button class="icon-btn" title="Editar" onclick="editClass(${classItem.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn" title="Ver detalhes" onclick="viewClassDetails(${classItem.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Preencher select de turmas
    if (classSelect) {
        classSelect.innerHTML = '<option value="">Selecione uma turma</option>' +
            activeClasses.map(classItem => `
                <option value="${classItem.id}">${classItem.name}</option>
            `).join('');
    }
}

// Função para carregar histórico
function loadHistory() {
    if (historyList) {
        historyList.innerHTML = updateHistory.map(history => `
            <div class="history-item">
                <div class="history-icon">
                    <i class="${history.icon}"></i>
                </div>
                <div class="history-content">
                    <h4>${history.title}</h4>
                    <div class="history-meta">${history.class} • ${history.date}</div>
                </div>
            </div>
        `).join('');
    }
}

// Função para atualizar progresso
function updateProgress(percentage) {
    if (progressFill && progressValue) {
        progressFill.style.width = `${percentage}%`;
        progressValue.textContent = `${percentage}%`;
    }
}

// Funções para ações das turmas
function editClass(classId) {
    const classItem = activeClasses.find(c => c.id === classId);
    if (classItem) {
        alert(`Editando turma: ${classItem.name}`);
        // Aqui você implementaria a lógica de edição
    }
}

function viewClassDetails(classId) {
    const classItem = activeClasses.find(c => c.id === classId);
    if (classItem) {
        alert(`Detalhes da turma: ${classItem.name}\nAno: ${classItem.year}\nAlunos: ${classItem.students}\nÚltima atualização: ${classItem.lastUpdate}`);
        // Aqui você implementaria a lógica para mostrar detalhes
    }
}

// Eventos do modal
if (addClassBtn) {
    addClassBtn.addEventListener('click', () => {
        if (addClassModal) {
            addClassModal.style.display = 'flex';
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (addClassModal) {
            addClassModal.style.display = 'none';
        }
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        if (addClassModal) {
            addClassModal.style.display = 'none';
        }
    });
}

if (classForm) {
    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter dados do formulário
        const formData = new FormData(classForm);
        const className = classForm.querySelector('input[type="text"]').value;
        const year = classForm.querySelectorAll('select')[0].value;
        const shift = classForm.querySelectorAll('select')[1].value;
        const students = classForm.querySelector('input[type="number"]').value;
        
        // Validar dados
        if (!className || !year || !shift || !students) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Criar nova turma
        const newClass = {
            id: activeClasses.length + 1,
            name: className,
            year: year + 'º Ano',
            students: parseInt(students),
            lastUpdate: new Date().toLocaleDateString('pt-BR')
        };
        
        // Adicionar à lista (em uma aplicação real, isso seria uma requisição AJAX)
        activeClasses.unshift(newClass);
        
        // Atualizar a interface
        loadClasses();
        
        // Adicionar ao histórico
        updateHistory.unshift({
            id: updateHistory.length + 1,
            title: 'Nova turma cadastrada',
            class: className,
            date: 'Agora',
            icon: 'fas fa-users'
        });
        loadHistory();
        
        // Atualizar progresso
        const newProgress = Math.min(100, 65 + 10); // Simula aumento de 10%
        updateProgress(newProgress);
        
        alert(`Turma "${className}" adicionada com sucesso!`);
        addClassModal.style.display = 'none';
        classForm.reset();
    });
}

// Eventos para upload de arquivo
if (dropZone) {
    dropZone.addEventListener('click', () => {
        if (fileInput) {
            fileInput.click();
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#3751ff';
        dropZone.style.backgroundColor = '#eef2ff';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#e6e9f2';
        dropZone.style.backgroundColor = 'transparent';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#e6e9f2';
        dropZone.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            handleFileSelection(e.dataTransfer.files);
        }
    });
}

if (fileInput) {
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFileSelection(fileInput.files);
        }
    });
}

// Função para processar seleção de arquivos
function handleFileSelection(files) {
    const file = files[0];
    if (!file) return;
    
    // Validar tipo de arquivo
    const allowedTypes = ['.csv', '.xlsx', '.pdf', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
        alert('Tipo de arquivo não suportado. Use CSV, XLSX, PDF ou TXT.');
        return;
    }
    
    // Validar tamanho do arquivo (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB em bytes
    if (file.size > maxSize) {
        alert('Arquivo muito grande. O tamanho máximo é 10MB.');
        return;
    }
    
    alert(`Arquivo "${file.name}" selecionado para upload.\nTamanho: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    
    // Simular upload (em uma aplicação real, isso seria uma requisição AJAX)
    simulateUpload(file);
}

// Função para simular upload
function simulateUpload(file) {
    const classSelect = document.getElementById('classSelect');
    const dataTypeSelect = document.getElementById('dataTypeSelect');
    
    if (!classSelect.value) {
        alert('Por favor, selecione uma turma antes de fazer upload.');
        return;
    }
    
    if (!dataTypeSelect.value) {
        alert('Por favor, selecione o tipo de dados.');
        return;
    }
    
    // Mostrar loading
    const originalText = dropZone.innerHTML;
    dropZone.innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 36px; color: #3751ff; margin-bottom: 10px;"></i>
        <p style="color: #3751ff; margin-bottom: 10px;">Enviando arquivo...</p>
    `;
    
    // Simular tempo de upload
    setTimeout(() => {
        // Restaurar conteúdo original
        dropZone.innerHTML = originalText;
        
        // Adicionar ao histórico
        const className = classSelect.options[classSelect.selectedIndex].text;
        const dataType = dataTypeSelect.options[dataTypeSelect.selectedIndex].text;
        
        updateHistory.unshift({
            id: updateHistory.length + 1,
            title: `Upload de ${dataType.toLowerCase()} realizado`,
            class: className,
            date: 'Agora',
            icon: 'fas fa-upload'
        });
        loadHistory();
        
        // Atualizar progresso
        const newProgress = Math.min(100, 65 + 5); // Simula aumento de 5%
        updateProgress(newProgress);
        
        alert(`Upload do arquivo "${file.name}" concluído com sucesso!`);
        
        // Limpar seleção
        fileInput.value = '';
        
    }, 2000);
}

// Evento para o botão de gerar plano de ação
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-outline') && e.target.closest('.btn-outline').textContent.includes('Gerar Plano de Ação')) {
        const classSelect = document.getElementById('classSelect');
        if (!classSelect || !classSelect.value) {
            alert('Por favor, selecione uma turma primeiro.');
            return;
        }
        
        const className = classSelect.options[classSelect.selectedIndex].text;
        alert(`Gerando plano de ação personalizado para: ${className}\n\nRecomendações baseadas nos dados mais recentes:\n• Aplicar estratégias de reforço em Matemática\n• Implementar atividades em grupo para Português\n• Realizar avaliação diagnóstica para Ciências`);
    }
});

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === addClassModal) {
        addClassModal.style.display = 'none';
    }
});

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    loadIndicators();
    loadClasses();
    loadHistory();
    updateProgress(65); // Progresso inicial de 65%
    
    // Adicionar evento de submit para prevenir comportamento padrão
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });
});

// Função para atualizar indicadores (exemplo de uso futuro)
function refreshIndicators() {
    // Simular atualização de dados
    indicators.forEach(indicator => {
        if (indicator.active) {
            // Simular pequenas variações nos valores
            if (indicator.title === 'Frequência') {
                const currentValue = parseInt(indicator.value);
                indicator.value = Math.min(100, currentValue + Math.floor(Math.random() * 3) - 1) + '%';
            } else if (indicator.title === 'Nota Média') {
                const currentValue = parseFloat(indicator.value);
                indicator.value = (currentValue + (Math.random() * 0.2 - 0.1)).toFixed(1);
            }
        }
    });
    
    loadIndicators();
    alert('Indicadores atualizados com sucesso!');
}

// Adicionar evento ao botão de atualizar indicadores
document.addEventListener('click', (e) => {
    if (e.target.closest('.icon-btn') && e.target.closest('.icon-btn').querySelector('.fa-sync-alt')) {
        refreshIndicators();
    }
});