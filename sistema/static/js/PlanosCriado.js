(function(){
      const searchInput = document.getElementById('searchInput');
      const clearBtn = document.getElementById('clearSearch');
      const filter = document.getElementById('filterStatus');
      const plansList = document.getElementById('plansList');
      const appliedFilter = document.getElementById('appliedFilter');
      const planosCount = document.getElementById('planosCount');

      function normalize(str){ return (str||'').toString().trim().toLowerCase(); }

      function applyFilters(){
        const q = normalize(searchInput && searchInput.value);
        const status = filter && filter.value;

        appliedFilter.textContent = status === 'all' ? 'Todos' : (status === 'em_andamento' ? 'Em andamento' : (status === 'concluido' ? 'Concluído' : 'Ativo'));

        if(!plansList) return;
        const items = Array.from(plansList.querySelectorAll('.plan-card'));
        let visibleCount = 0;
        
        items.forEach(item => {
          const title = item.getAttribute('data-title') || '';
          const st = item.getAttribute('data-status') || '';
          const matchesQuery = q === '' || title.includes(q);
          const matchesStatus = status === 'all' || st === status;
          
          if (matchesQuery && matchesStatus) {
            item.style.display = '';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });
        
        planosCount.textContent = visibleCount;
      }

      if(searchInput){
        searchInput.addEventListener('input', applyFilters);
      }
      if(clearBtn){
        clearBtn.addEventListener('click', function(){ if(searchInput){ searchInput.value = ''; applyFilters(); } });
      }
      if(filter){ filter.addEventListener('change', applyFilters); }

      // ação de marcar como concluído (requer endpoint no backend)
      document.addEventListener('click', function(e){
        const btn = e.target.closest('.btn-completar');
        if(!btn) return;
        const id = btn.getAttribute('data-id');
        if(!id) return;

        // requisição fetch simples (CSRF token necessário)
        const confirmed = confirm('Marcar este plano como concluído?');
        if(!confirmed) return;

        // Simulação de requisição bem-sucedida
        setTimeout(() => {
          const card = document.querySelector(`.btn-completar[data-id='${id}']`)?.closest('.plan-card');
          if(card){
            const badge = card.querySelector('.badge');
            if(badge) {
              badge.textContent = 'Concluído';
              badge.className = 'badge status-concluido';
            }
            card.setAttribute('data-status', 'concluido');
            card.querySelector('.progress-bar').style.width = '100%';
            card.style.opacity = 0.85;
          }
          alert(`Plano ${id} marcado como concluído com sucesso!`);
        }, 500);
      });

      // aplica filtros iniciais
      applyFilters();
    })();