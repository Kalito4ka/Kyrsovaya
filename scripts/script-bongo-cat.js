const bongoCat = document.getElementById('bongo_cat');
function handleDocumentClick(){
    bongoCat.classList.add('active');
    setTimeout(()=>{
    bongoCat.classList.remove('active');
    }, 100);
}
document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleDocumentClick);