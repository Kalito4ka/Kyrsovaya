const bongoCat = document.getElementById('bongo_cat');
function handleDocumentClick(){
// Добавляем класс 'active'. В CSS он меняет картинку на "удар лапкой".
    bongoCat.classList.add('active');
    // Используем setTimeout, чтобы отложить выполнение следующего кода.
    setTimeout(()=>{
    // Удаляем класс 'active', возвращая элемент в исходное состояние.
    bongoCat.classList.remove('active');
    }, 100);
}
document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleDocumentClick);