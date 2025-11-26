
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon();
    }

    // Form submission
    const profileForm = document.getElementById('profile-form');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const closeNotification = document.getElementById('close-notification');
    const cancelBtn = document.getElementById('cancel-btn');
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate saving changes
        notificationText.textContent = 'Suas alterações foram salvas com sucesso!';
        notification.style.display = 'flex';
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    });
    
    // Close notification
    closeNotification.addEventListener('click', function() {
        notification.style.display = 'none';
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', function() {
        if(confirm('Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas.')) {
            window.location.href = 'dashboard.html';
        }
    });
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Salvar preferência no localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if(document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});