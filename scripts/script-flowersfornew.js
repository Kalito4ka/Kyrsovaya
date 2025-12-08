
(function(){
  const cards = document.querySelectorAll('.card');
  const favKey = 'bp_favorites_v1';
  let favs = JSON.parse(localStorage.getItem(favKey) || '[]');

  function saveFavs(){ localStorage.setItem(favKey, JSON.stringify(favs)); }

  cards.forEach(card=>{
    const inner = card.querySelector('.card-inner');
    const favBtn = card.querySelector('.fav');

    const id = card.dataset.id;
    if(favs.includes(id)) favBtn.classList.add('active'), favBtn.setAttribute('aria-pressed','true');

    card.addEventListener('click', (e)=>{
      if(e.target.closest('.fav') || e.target.closest('.btn.add-more')) return;
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); card.classList.toggle('flipped'); }
    });

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