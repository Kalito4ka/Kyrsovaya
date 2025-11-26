document.addEventListener('DOMContentLoaded', () => {
    // 1. Логика лайков
    const likeButton = document.getElementById('likeButton');
    const likeCountSpan = document.getElementById('likeCount');
    const likeIcon = document.getElementById('likeIcon');
    // Убедимся, что начальное значение существует и является числом
    let likeCount = parseInt(likeCountSpan.textContent) || 0; 
    let isLiked = likeButton.dataset.liked === 'true';

    likeButton.addEventListener('click', () => {
        if (isLiked) {
            // Снять лайк
            likeCount--;
            isLiked = false;
            likeButton.classList.remove('liked');
            likeIcon.textContent = '🤍'; // Пустое сердце
        } else {
            // Поставить лайк
            likeCount++;
            isLiked = true;
            likeButton.classList.add('liked');
            likeIcon.textContent = '💚'; // Зеленое сердце
        }
        
        likeCountSpan.textContent = likeCount;
        likeButton.dataset.liked = isLiked; // Обновляем атрибут
    });

    // 2. Логика отправки формы (для демонстрации)
    const form = document.getElementById('consultationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Заявка на консультацию отправлена! Спасибо!');
        // Здесь обычно происходит отправка данных на сервер, например, с помощью fetch()
    });
});