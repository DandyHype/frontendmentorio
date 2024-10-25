const shareBtn = document.querySelector('.share__btn');
const sharePopup = document.querySelector('.share__popup');

shareBtn.addEventListener('click', (e) => {
    sharePopup.classList.toggle('hide');
})