/* ========== Карточки: flip + favorites (localStorage) ========== */
(function(){
  const cards = document.querySelectorAll('.card');
  // load favorites
  const favKey = 'bp_favorites_v1';
  let favs = JSON.parse(localStorage.getItem(favKey) || '[]');

  function saveFavs(){ localStorage.setItem(favKey, JSON.stringify(favs)); }

  cards.forEach(card=>{
    const inner = card.querySelector('.card-inner');
    const favBtn = card.querySelector('.fav');

    // initialize favourite visual
    const id = card.dataset.id;
    if(favs.includes(id)) favBtn.classList.add('active'), favBtn.setAttribute('aria-pressed','true');

    // flip on click or Enter/Space when focused
    card.addEventListener('click', (e)=>{
      // avoid flipping when clicking favorite button
      if(e.target.closest('.fav') || e.target.closest('.btn.add-more')) return;
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); card.classList.toggle('flipped'); }
    });

    // favorite toggle
    favBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const pressed = favBtn.classList.toggle('active');
      favBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      if(pressed){ if(!favs.includes(id)) favs.push(id); }
      else { favs = favs.filter(x=>x!==id); }
      saveFavs();
    });
  });
})();