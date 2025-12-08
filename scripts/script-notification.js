document.addEventListener('DOMContentLoaded', function () {
    const notificationButton = document.getElementById('notificationButton'); //кнопка уведов
    const notificationCount = document.getElementById('notificationCount');     //кол-во уведов
    const notificationsDropdown = document.getElementById('notificationsDropdown'); //контейнер куда будут вставляться уведы

    let notificationList = []; // Массив для хранения всех уведомлений
    let unreadCount = 0;

    /**
     * Генерирует новое уведомление о магазине цветов.
     * @returns {object} Объект уведомления.
     */
    function createNewNotification() {
        const isCatalogOffer = Math.random() < 0.5; // 50% шанс для каждого типа

        if (isCatalogOffer) {
            return {
                id: Date.now(),
                message: "🌿 **Новое поступление!** Купите свежие цветы в нашем каталоге товаров.",
                linkText: "Перейти в каталог",
                url: "../htmls/flower-shop.html" 
            };
        } else {
            return {
                id: Date.now(),
                message: "🎁 **Спецпредложение!** Получите случайное растение **со скидкой 50%.**",
                linkText: "Получить скидку",
                url: "../htmls/courtship-tips.html"
            };
        }
    }

    /*Обновляет отображение счетчика уведомлений.*/
    function updateCountDisplay() {
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'inline' : 'none'; 
        //если счётсчик больше 0 то показываем увед, если нет
    }

    /*Добавляет новое уведомление в список и обновляет счетчик.*/
    function addNotification() {
        const newNotification = createNewNotification();
        notificationList.unshift(newNotification); // Добавляем в начало списка
        unreadCount++;
        updateCountDisplay();

        // Если список открыт, обновляем его содержимое
        if (notificationsDropdown.classList.contains('show')) {
            renderNotifications();
        }
    }
    /* Отображает все уведомления в выпадающем списке.*/
    function renderNotifications() {
        notificationsDropdown.innerHTML = ''; // Очищаем список

        if (notificationList.length === 0) {
            const emptyItem = document.createElement('div');
            emptyItem.className = 'notification-empty';
            emptyItem.textContent = 'У вас пока нет уведомлений.';
            notificationsDropdown.appendChild(emptyItem);
            return;
        }

        notificationList.forEach(notification => {
            const item = document.createElement('div');
            item.className = 'notification-item';

            // Заменяем **текст** на <strong>текст</strong>
            const formattedMessage = notification.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            item.innerHTML = `
                ${formattedMessage}
                <br>
                <a href="${notification.url}" target="_blank">${notification.linkText}</a>
            `;

            notificationsDropdown.appendChild(item);
        });
    }
    /*Обработчик нажатия на кнопку уведомлений.*/
    function toggleDropdown() {
        notificationsDropdown.classList.toggle('show');

        if (notificationsDropdown.classList.contains('show')) {
            renderNotifications();

            if (unreadCount > 0) {
                unreadCount = 0;
                updateCountDisplay();
            }
        }
    }
    //Инициализация и События
    // Каждые 2 минуты
    setInterval(addNotification, 120000);
    // Первое уведомление сразу
    addNotification();

    // Кнопка уведомлений
    notificationButton.addEventListener('click', toggleDropdown);

    // Закрытие при клике вне области
    document.addEventListener('click', function (event) {
        if (!notificationButton.contains(event.target) && !notificationsDropdown.contains(event.target)) {
            notificationsDropdown.classList.remove('show');
        }
    });
});
