const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
const dismissBtn = document.getElementById('dismiss__btn');
       
if(email){
            document.getElementById('message__email').textContent = `${email}`;
        }

dismissBtn.addEventListener('click', () => {
    window.location.href = "frontendmentorio/newsletter-sign-up-with-success-message-main/index.html"
})