/*файл script-caruosel.js*/
(function () {
  // Селекторы
  const carousel = document.querySelector('.timeline-carousel');
  if (!carousel) return;
  const slidesWrap = carousel.querySelector('.tc-slides');
  const slides = Array.from(carousel.querySelectorAll('.tc-slide'));
  const prevBtn = carousel.querySelector('.tc-prev');
  const nextBtn = carousel.querySelector('.tc-next');
  const controls = carousel.querySelector('.tc-controls');

  let current = 0;
  // total - общее количество слайдов (5)
  const total = slides.length;
  
  // Динамические переменные для адаптивной логики:
  let MAX_PAGES; // Общее количество возможных сдвигов/страниц
  let MAX_INDEX; // Максимальный индекс сдвига (последняя возможная страница)
  let VISIBLE_SLIDES; // Количество слайдов, видимых на экране
  
  let isAnimating = false;
  let autoplayId = null;
  const AUTOPLAY_DELAY = 4500;
  const AUTOPLAY_ENABLED = true;
  /**
   * Определяет количество слайдов, видимых на экране
   * @returns {number} Количество видимых слайдов (3, 2 или 1).
   */
  function getVisibleSlidesCount() {
      const width = window.innerWidth;
      if (width <= 780) {
          return 1; 
      } else if (width <= 1220) {
          return 2; 
      } else {
          return 3; 
      }
  }
  /**
   * Обновляет все параметры, зависящие от размера экрана (VISIBLE_SLIDES, MAX_PAGES, MAX_INDEX).
   * Вызывается при загрузке и изменении размера окна.
   */
  function updateCarouselDimensions() {
      const newVisibleSlides = getVisibleSlidesCount();

      // Пересчитываем только если количество видимых слайдов изменилось
      if (newVisibleSlides !== VISIBLE_SLIDES) {
          VISIBLE_SLIDES = newVisibleSlides;
          
          // MAX_INDEX = общее количество слайдов - количество видимых слайдов.
          // Это индекс последнего слайда, который может быть первым видимым.
          MAX_INDEX = total - VISIBLE_SLIDES; 
          
          // MAX_PAGES - количество "страниц" (сдвигов), включая первую (индекс 0).
          MAX_PAGES = MAX_INDEX + 1;

          // Если MAX_INDEX <= 0 (т.е. все слайды видны), 
          // то индекс должен быть 0 и всего одна страница.
          if (MAX_INDEX <= 0) {
             MAX_INDEX = 0;
             MAX_PAGES = 1;
          }

          // Корректируем текущий индекс, чтобы не выйти за пределы нового MAX_INDEX
          if (current > MAX_INDEX) {
              current = MAX_INDEX;
          }
          
          // Обновляем контролы и позицию сразу после изменения размеров
          updateTransform();
          updateControls();
          updateControlDots();
      }
  }
  // Обновленная функция для расчета фактического смещения (ширина одного слайда + gap)
  function getSlideOffset() {
    const firstSlide = slides[0];
    if (!firstSlide) return 0;
    
    // Динамически определяем GAP
    const GAP = window.innerWidth <= 640 ? 10 : 20; 

    // Используем clientWidth, чтобы получить актуальную ширину
    const slideWidth = firstSlide.clientWidth; 

    // Сдвиг = ширина слайда + отступ
    return slideWidth + GAP;
  }
  /**
   * Применяет CSS transform для сдвига слайдов.
   */
  function updateTransform() {
      // Смещение в пикселях = текущий индекс * (ширина слайда + отступ)
      const offset = current * getSlideOffset();
      slidesWrap.style.transform = `translateX(-${offset}px)`;
  }
  /**
   * Обновляет состояние кнопок (активна/неактивна)
   */
  function updateControls() {
      // Отключаем 'Назад', если мы на первом слайде (индекс 0)
      prevBtn.disabled = current === 0;
      
      // Отключает 'Вперед', если мы на последней возможной странице
      // Если MAX_INDEX = 0, то обе кнопки отключены.
      nextBtn.disabled = current === MAX_INDEX;
      
      // Обновляем фокус доступности
      updateTabFocus(current);
  }
  /**
   * Обновляет фокус на элементах внутри слайдов.
   * Делает интерактивными только те слайды, которые видны или могут быть видны.
   * @param {number} startIndex - Индекс первого видимого слайда.
   */
  function updateTabFocus(startIndex) {
      slides.forEach((slide, index) => {
          // Индексы видимых слайдов: от startIndex до startIndex + VISIBLE_SLIDES - 1
          const isVisible = index >= startIndex && index < startIndex + VISIBLE_SLIDES;
          
          // Установка атрибута tabindex для элементов внутри слайда
          const focusableElements = slide.querySelectorAll('a, button, input, select, textarea');
          focusableElements.forEach(el => {
              el.setAttribute('tabindex', isVisible ? '0' : '-1');
          });

          // Установка атрибута aria-hidden для самого слайда
          slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      });
  }
  /* Переход к следующему слайду/странице.*/
  function nextSlide() {
      if (isAnimating || current >= MAX_INDEX) return;
      isAnimating = true;

      // Переход к следующему индексу
      current++;
      updateTransform();
      updateControls();
      updateControlDots();
      startAutoplay(); // Сбрасываем таймер автоплея после ручного сдвига

      // Сброс флага анимации после завершения transition
      setTimeout(() => {
          isAnimating = false;
      }, 400);
  }
  /* Переход к предыдущему слайду/странице.*/
  function prevSlide() {
      if (isAnimating || current <= 0) return;
      isAnimating = true;
      
      // Переход к предыдущему индексу
      current--;
      updateTransform();
      updateControls();
      updateControlDots();
      startAutoplay(); // Сбрасываем таймер автоплея после ручного сдвига

      // Сброс флага анимации после завершения transition
      setTimeout(() => {
          isAnimating = false;
      }, 400);
  }
  /**
   * Переход к указанному индексу страницы.
   * @param {number} index - Индекс страницы (0 до MAX_INDEX).
   */
  function goToSlide(index) {
      if (index < 0 || index > MAX_INDEX || index === current) return;
      current = index;
      updateTransform();
      updateControls();
      updateControlDots();
      startAutoplay();
  }
  /*Создает и обновляет точки-контролы.*/
  function updateControlDots() {
      // Очищаем старые точки
      controls.innerHTML = ''; 

      for (let i = 0; i < MAX_PAGES; i++) {
          const dot = document.createElement('button');
          dot.className = 'tc-control-dot';
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-label', `Перейти к странице ${i + 1} из ${MAX_PAGES}`);
          
          if (i === current) {
              dot.classList.add('active');
              dot.setAttribute('aria-selected', 'true');
          } else {
              dot.setAttribute('aria-selected', 'false');
          }

          // обработчик клика для перехода
          dot.addEventListener('click', () => goToSlide(i));
          controls.appendChild(dot);
      }
  }

  /*Обработчик нажатия клавиш для навигации */
  function onKey(event) {
      switch (event.key) {
          case 'ArrowLeft':
              prevSlide();
              break;
          case 'ArrowRight':
              nextSlide();
              break;
      }
  }
  /**
   * Обработчик изменения размера окна.
   */
  function onResize() {
      // Обновляем адаптивные размеры карусели
      updateCarouselDimensions();
      // Обновляем transform для применения новой позиции и смещения
      updateTransform();
  }
  //Автовоспроизведение
  /**
   * Переходит к следующему слайду для автоплея.
   */
  function autoplayHandler() {
      // Если мы достигли конца, возвращаемся к началу (цикл)
      if (current >= MAX_INDEX) {
          goToSlide(0);
      } else {
          nextSlide();
      }
  }
  /**
   * Запускает интервал автоплея.
   */
  function startAutoplay() {
      if (!AUTOPLAY_ENABLED) return;
      stopAutoplay(); // Сначала очищаем, чтобы не было дублирования
      autoplayId = setInterval(autoplayHandler, AUTOPLAY_DELAY);
  }
  /**
   * Останавливает интервал автоплея.
   */
  function stopAutoplay() {
      if (autoplayId) {
          clearInterval(autoplayId);
          autoplayId = null;
      }
  }
  //Поддержка свайпов
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50; // Минимальное расстояние свайпа в пикселях
  function handleGesture() {
      // Расчет разницы: положительное = свайп влево (prev), отрицательное = свайп вправо (next)
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > SWIPE_THRESHOLD) {
          if (diff > 0) {
              // Свайп влево (показать следующий слайд)
              nextSlide();
          } else {
              // Свайп вправо (показать предыдущий слайд)
              prevSlide();
          }
      }
  }
  function addSwipeSupport() {
      // Добавляем {passive: true} для повышения производительности скролла
      slidesWrap.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});

      slidesWrap.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleGesture();
      }, {passive: true});

      slidesWrap.addEventListener('touchmove', e => {
          // Отслеживаем движение
      }, {passive: true});
  }
  // --- Инициализация ---
  function init() {
    // Устанавливаем начальные размеры и пределы (для адаптивности)
    // Эта функция автоматически вызывает updateTransform(), updateControls() и updateControlDots()
    updateCarouselDimensions(); 
    
    // Устанавливаем слушатели событий
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    window.addEventListener('keydown', onKey);
    // Добавляем debounce для resize, чтобы предотвратить слишком частые вызовы
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(onResize, 150); // Задержка 150ms
    });

    addSwipeSupport();

    // Запускаем автоплей, если включен
    if (AUTOPLAY_ENABLED) {
        startAutoplay();
    }

    // Пауза автоплея при наведении/фокусе
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // Доступность
    const srLive = document.createElement('div');
    srLive.setAttribute('aria-live', 'polite');
    srLive.className = 'sr-only';
    srLive.style.position = 'absolute';
    srLive.style.left = '-9999px';
    srLive.style.width = '1px';
    srLive.style.height = '1px';
    srLive.style.overflow = 'hidden';
    srLive.id = 'tc-live';
    document.body.appendChild(srLive);

    // Обновление текста в live-region после каждого перехода
    slidesWrap.addEventListener('transitionend', () => {
      // Определяем индекс активного слайда (первый видимый)
      if (current < slides.length) {
          const active = slides[current].querySelector('.tc-overlay h3');
          if (active) document.getElementById('tc-live').textContent = active.textContent;
      }
    });
  }
  // Запуск карусели
  init();

})();