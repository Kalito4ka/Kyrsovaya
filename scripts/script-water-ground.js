document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".test-answer-card");
    const resultBlock = document.getElementById("test-result");

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
                    bgColor = 'bg-plant-green';
                    break;
            }

            colorClasses.forEach(c => resultBlock.classList.remove(c));

            resultBlock.classList.add(bgColor);

            resultBlock.textContent = message;
            resultBlock.classList.remove("hidden");
        });
    });
});