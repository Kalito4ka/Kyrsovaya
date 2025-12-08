// Данные о растениях: rarityLevel (1-5) для цвета, difficultyRating (1-3 звезды) для сложности
const plantsData = [
    { name: "Хлорофитум", latin: "Chlorophytum comosum", rarityLevel: 1, difficultyRating: 1, stats: { care: "очень низкий", water: "умеренный", light: "полутень" }, image: "../fotos/chlorophytum.png", rarityText: "обычное растение" },
    { name: "Сансевиерия", latin: "Sansevieria trifasciata", rarityLevel: 2, difficultyRating: 1, stats: { care: "низкий", water: "редкий", light: "любой" }, image: "../fotos/sansevieria.png", rarityText: "не редкое" },
    { name: "Аглаонема", latin: "Aglaonema", rarityLevel: 3, difficultyRating: 2, stats: { care: "средний", water: "регулярный", light: "рассеянный" }, image: "../fotos/aglaonema.jpg", rarityText: "средняя редкость" },
    { name: "Фикус Лирата", latin: "Ficus lyrata", rarityLevel: 3, difficultyRating: 2, stats: { care: "средний", water: "умеренный", light: "яркий" }, image: "../fotos/ficuslyrata.jpg", rarityText: "средняя редкость" },
    { name: "Орхидея Фаленопсис", latin: "Phalaenopsis", rarityLevel: 4, difficultyRating: 2, stats: { care: "выше среднего", water: "погружением", light: "яркий, рассеянный" }, image: "../fotos/Phalaenopsis.jpeg", rarityText: "редкий экземпляр" },
    { name: "Калатея", latin: "Calathea orbifolia", rarityLevel: 5, difficultyRating: 3, stats: { care: "высокий", water: "частый, нужна влажность", light: "рассеянный" }, image: "../fotos/Calathea.jpeg", rarityText: "ультра-редкий!" },
    { name: "Венерина Мухоловка", latin: "Dionaea muscipula", rarityLevel: 5, difficultyRating: 3, stats: { care: "очень высокий", water: "дистиллир.", light: "прямой" }, image: "../fotos/Myholovka.jpg", rarityText: "ультра-редкий!" },
];

document.addEventListener('DOMContentLoaded', () => {
    // Получение элементов DOM
    const mysteryCard = document.getElementById('mystery-card');
    const promoInfo = document.getElementById('promo-info');
    const errorMessage = document.getElementById('error-message');
    const plantNameEl = document.getElementById('plant-name');
    const plantLatinEl = document.getElementById('plant-latin');
    const plantImageEl = document.getElementById('plant-image');
    const statCareEl = document.getElementById('stat-care');
    const statWaterEl = document.getElementById('stat-water');
    const statLightEl = document.getElementById('stat-light');
    const difficultyStarsEl = document.getElementById('difficulty-stars');
    const rarityInfoEl = document.getElementById('rarity-info');

    // initial state элемент внутри карточки (иконка вопроса и текст)
    const initialStateEl = mysteryCard ? mysteryCard.querySelector('.initial-state') : null;

    let hasRolled = false;

    // Функция для генерации звездного рейтинга (возвращает HTML строку с иконками)
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 3; i++) {
            if (i <= rating) {
                // Заполненная звезда (Font Awesome solid)
                stars += '<i class="fas fa-star" aria-hidden="true"></i>';
            } else {
                // Пустая звезда (Font Awesome regular)
                stars += '<i class="far fa-star" aria-hidden="true"></i>';
            }
        }
        return stars;
    }

    // Защита: если нужных элементов нет, прекращаем
    if (!mysteryCard || !promoInfo || !errorMessage) {
        console.warn('Gacha script: не все DOM-элементы найдены. Проверьте наличие #mystery-card, #promo-info, #error-message.');
        return;
    }

    // Обработчик клика по карточке
    mysteryCard.addEventListener('click', () => {
        // Если уже проиграли — показываем сообщение об ошибке (блокируется повторный розыгрыш)
        if (hasRolled) {
            errorMessage.classList.remove('is-hidden');
            return;
        }

        hasRolled = true;

        // Выбираем случайное растение
        const randomIndex = Math.floor(Math.random() * plantsData.length);
        const selectedPlant = plantsData[randomIndex];

        // Запускаем анимацию ролла (CSS класс .rolling)
        mysteryCard.classList.add('rolling');

        // Сразу прячем начальное содержимое (иконка вопроса)
        if (initialStateEl) initialStateEl.style.opacity = '0';

        // Через время, соответствующее длине анимации — обновляем содержимое
        setTimeout(() => {
            // Убираем серый класс closed и прежние классы редкости (если были)
            mysteryCard.classList.remove('closed', 'rarity-level-1', 'rarity-level-2', 'rarity-level-3', 'rarity-level-4', 'rarity-level-5');
            // Добавляем класс редкости, например rarity-level-3
            mysteryCard.classList.add(`rarity-level-${selectedPlant.rarityLevel}`);

            // Обновляем текстовую информацию и картинку
            rarityInfoEl.textContent = `РЕДКОСТЬ: ${selectedPlant.rarityText} (${selectedPlant.rarityLevel}/5)`;
            plantNameEl.textContent = selectedPlant.name;
            plantLatinEl.textContent = selectedPlant.latin;
            plantImageEl.src = selectedPlant.image;
            plantImageEl.alt = selectedPlant.name;

            // Звёздочки сложности
            difficultyStarsEl.innerHTML = generateStars(selectedPlant.difficultyRating);

            // Статистика ухода
            statCareEl.textContent = selectedPlant.stats.care;
            statWaterEl.textContent = selectedPlant.stats.water;
            statLightEl.textContent = selectedPlant.stats.light;

            // Показываем промокод
            promoInfo.classList.remove('is-hidden');

            // Убираем анимацию (если хотите оставить финальный поворот, можно НЕ убирать этот класс)
            mysteryCard.classList.remove('rolling');
        }, 1200); // задержка 1200ms соответствует CSS transition/animation
    });
});