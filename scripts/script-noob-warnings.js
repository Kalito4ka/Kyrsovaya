(function(){
  // Список предупреждений
  const warnings = [
    '❄️ Не ставь цветы под кондиционер.',
    '🫗 Не поливай по расписанию — поливай по состоянию почвы.',
    '🌱 Не пересаживай слишком часто — дай корням освоиться.',
    '🔥 Не ставь растения вплотную к батарее зимой — они пересыхают.',
    '🥀 Не перегибай с удобрениями — лишнее удобрение вреднее, чем его отсутствие.',
    '☀️ Не ставь всё на солнце: некоторые виды любят полутень.',
    '🧫 Не оставляй стоять воду в поддоне длительное время.',
    '🔪 Не режь корни при пересадке — действуй аккуратно.',
    '🧊 Не используй холодную воду прямо из-под крана для капризных растений.',
    '😥 Не паникуй при первых желтых листках — найди причину сначала.'
  ];

  // элементы DOM
  const viewport = document.getElementById('nwViewport');
  const item = document.getElementById('nwItem');
  const textEl = document.getElementById('nwText');
  const refreshBtn = document.getElementById('nwRefresh');

  // интервал в секундах: случайный между min и max
  const MIN_SEC = 40;
  const MAX_SEC = 60;

  let timerId = null;
  let paused = false;

  // получить случайный интервал в мс
  function randomIntervalMs(){
    const s = Math.floor(Math.random() * (MAX_SEC - MIN_SEC + 1)) + MIN_SEC;
    return s * 1000;
  }

  // выбрать случайное предупреждение
  let currentIndex = 0;
  function pickRandomIndex(){
    if(warnings.length <= 1) return 0;
    let i;
    do { i = Math.floor(Math.random() * warnings.length); } while(i === currentIndex);
    return i;
  }

  // плавно показать сообщение по индексу
  function showIndex(i){
    currentIndex = i;
    // скрываем старое
    item.classList.add('hidden');
    // после анимации меняем текст и снова показываем
    setTimeout(()=> {
      textEl.textContent = warnings[currentIndex];
      item.classList.remove('hidden');
    }, 420); // совпадает с transition .45s
  }

  // запуск авто-циклинга
  function startCycle(){
    stopCycle();
    timerId = setTimeout(function tick(){
      if(!paused){
        const idx = pickRandomIndex();
        showIndex(idx);
      }
      // ставим следующий таймер с новым случайным интервалом
      timerId = setTimeout(tick, randomIntervalMs());
    }, randomIntervalMs());
  }

  function stopCycle(){
    if(timerId){ clearTimeout(timerId); timerId = null; }
  }

  // пауза на hover / focus
  viewport.addEventListener('mouseenter', ()=> { paused = true; });
  viewport.addEventListener('mouseleave', ()=> { paused = false; });
  viewport.addEventListener('focusin', ()=> { paused = true; });
  viewport.addEventListener('focusout', ()=> { paused = false; });

  // кнопка обновить вручную
  refreshBtn.addEventListener('click', ()=>{
    const idx = pickRandomIndex();
    showIndex(idx);
    // перезапускаем цикл чтобы интервал сбросился
    stopCycle();
    startCycle();
  });

  // инициализация: случайный первоначальный индекст
  currentIndex = Math.floor(Math.random() * warnings.length);
  textEl.textContent = warnings[currentIndex];

  // стартуем автопрокрутку
  startCycle();

  // очищаем при выгрузке страницы
  window.addEventListener('beforeunload', stopCycle);
})();