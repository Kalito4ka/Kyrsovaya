// script-aside.js

// Массив фактов
const dailyFacts = [
    "Самое высокое комнатное растение — бамбуковая пальма (Chamaedorea seifrizii), она может достигать 3 метров в высоту.",
    "Растение Алоэ Вера считается «живым индикатором» воздуха: если в помещении много вредных веществ, на его листьях появляются коричневые пятна.",
    "Некоторые суккуленты (например, Толстянка) поглощают углекислый газ ночью, что делает их идеальными для спальни.",
    "В Древнем Китае нефритовое дерево (Crassula ovata) символизировало богатство и финансовый успех, его часто дарили на новоселье.",
    "Хлорофитум (Chlorophytum comosum) способен очистить воздух от формальдегида, ксилола и угарного газа лучше большинства других растений.",
    "Кто-нибудь вообще это читает?",
    "Можно купить горшки, удобрения и растения в нашем магазине! Также не забывайте записываться на консультации. Певрвая бесплатно!"
];

const factDisplayElement = document.getElementById('daily-fact-content');

const intervalTime = 30000; // 30 секунд

let currentFactIndex = 0;
let factIntervalId = null; // Для хранения ID интервала

/**
 * Функция для обновления отображаемого факта.
 */
function updateDailyFact() {
    if (factDisplayElement && dailyFacts.length > 0) {
        factDisplayElement.textContent = dailyFacts[currentFactIndex];
        // Переход к следующему факту по кругу
        currentFactIndex = (currentFactIndex + 1) % dailyFacts.length;
    }
}

/**
 * Инициализация виджета: установка интервала.
 */
function startFactWidget() {
    //Показать первый факт сразу
    updateDailyFact();
    
    //Установить интервал для смены фактов
    factIntervalId = setInterval(updateDailyFact, intervalTime);
    console.log('Fact widget started. Interval ID:', factIntervalId);
}

/**
 * Очистка интервала (важно для оптимизации и предотвращения утечек памяти).
 */
function stopFactWidget() {
    if (factIntervalId !== null) {
        clearInterval(factIntervalId);
        console.log('Fact widget stopped. Cleared interval ID:', factIntervalId);
        factIntervalId = null;
    }
}

// Запускаем виджет при загрузке страницы
document.addEventListener('DOMContentLoaded', startFactWidget);