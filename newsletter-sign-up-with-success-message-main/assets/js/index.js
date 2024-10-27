const formBtn = document.getElementById("form__btn");
const cardForm = document.querySelector(".card__form");
const errorMsg = cardForm.querySelector(".form__errormsg");
const emailInput = cardForm.querySelector(".form__input");


const emailAllowedChars = new Set([
  ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "!",
  "#",
  "$",
  "%",
  "&",
  "'",
  "*",
  "+",
  "/",
  "=",
  "?",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
  "-",
  ".", // Special characters for local part
]);

// Domain allowed characters (with additional restrictions)
const domainAllowedChars = new Set([
  ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "-",
  ".", // Special characters for domain part
]);



function checkEmail(email) {
  // Checking if it's a string

  if (typeof email !== "string") {
    return false;
  }

  length = email.length;
  // Email must contain at least 5 characters to be valid ex. a@b.c

  if (length < 4) {
    return false;
  }

  // Splitting the email adress and checking if we have a local and a domain name

  const split = email.split("@");
  //if we dont have exactly 2 parts and at least 1 char for local and at least 2 char for domain name return false
  if (split.length !== 2 || split[0].length <= 0 || split[1].length <= 2) {
    return false;
  }

  //Checking each character for local and domain

  for (i = 0; i < split[0].length; i++) {
    if (!emailAllowedChars.has(split[0][i])) {
      return false;
    }
  }

  for (i = 0; i < split[1].length; i++) {
    if (!domainAllowedChars.has(split[1][i])) {
      return false;
    }
  }
//   If all steps finished withouth throwing false we have a valid email adress
  return true;
}

function submitForm(isValid, mailAdress){
    if(isValid){
        emailInput.classList.remove('form__error');
        errorMsg.classList.remove('visible');
        window.location.href = "/success.html?email=" + mailAdress;
    }
    else{
        emailInput.classList.add('form__error');
        errorMsg.classList.add('visible');
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mailAdress = formData.get('email');
    const isEmailValid = checkEmail(mailAdress);
    submitForm(isEmailValid, mailAdress);
  }

cardForm.addEventListener("submit", handleSubmit);


// Code for Success page

function checkUrl(){
    if(window.location.pathname === "/success.html"){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const email = urlParams.get('email');
        if(email){
            document.querySelector('.card__message').innerHTML = `A confirmation email has been sent to <strong>${email}</strong> 
            Please open it and click the button inside to confirm your subscription.`;
        }
    }
}
