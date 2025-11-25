document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".test-answer-card");
    const resultBlock = document.getElementById("test-result");
    // 💡 Определяем список возможных цветовых классов, которые нужно будет удалять.
    const colorClasses = ['bg-red-500', 'bg-yellow-500', 'bg-plant-green']; 

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const action = card.dataset.action;
            let message = "";
            let bgColor = "";

            switch (action) {
                case 'water':
                    message = '⚠️ Хватит поливать! Грунт слишком влажный для большинства растений. Дайте ему просохнуть.';
                    bgColor = 'bg-red-500';
                    break;
                case 'wait-maybe':
                    message = '❓ Сомнения! Проверьте глубже. Для большинства растений лучше подождать 1-2 дня.';
                    bgColor = 'bg-yellow-500';
                    break;
                case 'wait':
                    message = '🫗 Грунт сухой! Если это не суккулент, то пора поливать.';
                    // 💡 Используем 'bg-plant-green'
                    bgColor = 'bg-plant-green';
                    break;
            }

            // 💡 ИСПРАВЛЕНИЕ: Вместо сброса всего className, удаляем старые цветовые классы
            colorClasses.forEach(c => resultBlock.classList.remove(c));
            
            // 💡 Добавляем новый цветовой класс
            resultBlock.classList.add(bgColor);

            resultBlock.textContent = message;
            resultBlock.classList.remove("hidden");
        });
    });
});