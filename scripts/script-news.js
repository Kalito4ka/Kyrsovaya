
(function(){
  const INTERVAL_SECONDS = 60;

  const news = [
    {
      img: '../fotos/news1.jpg',
      title: 'Кактус выиграл марафон... в горшке',
      text: 'Местный кактус стал звездой: хозяин поставил его на колёсики и провёл мини-забег по подоконнику. Жюри в шоке.'
    },
    {
      img: '../fotos/news2.jpg',
      title: 'Монстера съела Wi-Fi?',
      text: 'Хозяева жалуются, что сигналы роутера часто теряются возле большого листа.'
    },
    {
      img: '../fotos/news3.jpg',
      title: 'Мята устроила вечеринку',
      text: 'Соседи обнаружили, что мята чаще собирает гостей, чем хозяин приглашает.'
    },
    {
      img: '../fotos/news4.jpg',
      title: 'Фикус научился стучать',
      text: 'Кот использовал растение как барабан. Фикус цел, кот счастлив.'
    },
    {
      img: '../fotos/news5.jpg',
      title: 'Лаванда решила помочь с бессоницей',
      text: 'Она просто благоухала, пока хозяин не уснул на кухонном столе.'
    }
  ];

  // DOM
  const viewport = document.getElementById('newsViewport');
  const imgEl = viewport.querySelector('.news-img');
  const headEl = viewport.querySelector('.news-head');
  const bodyEl = viewport.querySelector('.news-body');
  const itemEl = viewport.querySelector('.news-item');

  const prevBtn = document.getElementById('newsPrev');
  const nextBtn = document.getElementById('newsNext');

  let idx = 0;
  let timerId = null;

  // Показываем с анимацией
  function showIndex(i){
    if(i < 0) i = news.length - 1;
    if(i >= news.length) i = 0;
    idx = i;

    itemEl.classList.add('hidden');

    setTimeout(()=>{
      const n = news[idx];
      imgEl.src = n.img;
      imgEl.alt = n.title;
      headEl.textContent = n.title;
      bodyEl.textContent = n.text;

      itemEl.classList.remove('hidden');
    }, 350);
  }

  function next(){ showIndex(idx + 1); }
  function prev(){ showIndex(idx - 1); }

  // Таймер автосмены
  function startTimer(){
    stopTimer();
    timerId = setInterval(next, INTERVAL_SECONDS * 1000);
  }

  function stopTimer(){
    if(timerId){ clearInterval(timerId); timerId = null; }
  }

  // Обновление таймера после ручного переключения
  function resetTimer(){
    stopTimer();
    setTimeout(() => startTimer(), 1000);
  }

  // Навигация
  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
  nextBtn.addEventListener('click', () => { next(); resetTimer(); });

  // Клавиатура (только стрелки)
  document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight'){ next(); resetTimer(); }
    if(e.key === 'ArrowLeft'){ prev(); resetTimer(); }
  });

  // Старт
  showIndex(0);
  startTimer();

})();