// Константы для целевых значений счетчика (в процентах)
const STEP_1_VALUE = 25;
const STEP_2_VALUE = 52;
const STEP_3_VALUE = 71;
const STEP_4_VALUE = 97;

let counterInitialized = false;

/**
 * Плавно анимирует счетчик от текущего до целевого значения.
 * Поддерживает как увеличение, так и уменьшение.
 * @param {number} targetValue - Целевое значение (0..100).
 * @param {number} duration - Продолжительность анимации в миллисекундах.
 */
function animateCounter(targetValue, duration = 1500) {
  const countElement = document.getElementById('air-clean-count');
  if (!countElement) return;

  // Считываем текущее значение (удаляем % и пробелы)
  let startValue = parseInt(String(countElement.textContent).replace(/[^0-9\-]/g, ''), 10);
  if (Number.isNaN(startValue)) startValue = 0;

  // Если цель равна текущему — ничего не делаем
  if (targetValue === startValue) return;

  const startTimestamp = performance.now();
  const diff = targetValue - startValue;

  function updateCount(timestamp) {
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.round(startValue + diff * progress);

    countElement.textContent = `${currentValue}%`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      countElement.textContent = `${targetValue}%`;
    }
  }

  requestAnimationFrame(updateCount);
}

/**
 * Создаёт IntersectionObserver для запуска анимации при появлении элемента.
 * @param {string} elementId
 * @param {number} targetValue
 */
function createStepObserver(elementId, targetValue) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(targetValue, 1000);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(targetElement);
}

/**
 * Устанавливает наблюдателей для секций, чтобы прогрессия счетчика шла по мере скролла.
 */
function setupProgressionObservers() {
  createStepObserver('Second-card', STEP_2_VALUE);
  createStepObserver('Third-card', STEP_3_VALUE);
  createStepObserver('scroll-trigger', STEP_4_VALUE);
}

/**
 * Инициализация приложения: запускаем стартовую анимацию и регистрируем наблюдателей.
 */
function initApp() {
  if (counterInitialized) return;

  animateCounter(STEP_1_VALUE, 2000);
  counterInitialized = true;

  // Наблюдатели должны быть созданы чуть позже, чтобы DOM успел отрисоваться
  // (но можно вызывать сразу, если элементы уже в DOM)
  setupProgressionObservers();
}

// Запуск на событии DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);