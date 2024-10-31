const passwordDisplay = document.querySelector('.output__password');
const copyMessage = document.querySelector('.copy__message');
const copyBtn = document.querySelector('.copy__svg');
const sliderValue = document.querySelector('.lenslider__output');
const slider = document.querySelector('.length__slider');
const checkBoxOptions = document.querySelectorAll('.option__checkbox');
const generateBtn = document.querySelector('.generate__btn');
const passwordStrengthText = document.querySelector('.visual__name');
const strengthBarBlock = document.querySelectorAll('.bar__block');

const options = {
    uppercase   : "ABCDEFGHJKLMNPQRSTUVWXYZ", 
    lowercase   : "abcdefghjkmnopqrstuvwxyz", 
    numbers     : "0123456789",
    symbols     : "!@#$%^&*()_+[]{}|;:,.<>/?"
};
const strengthObj = {
   100000000 : ["Too Weak!" , ["bar__block-red" , 1]],
   1785793904895 : ["Weak"  ,    ["bar__block-orange", 2]],
   128063081718015 : ["Medium" ,   ["bar__block-yellow", 3]],
   2252292232139040 : ["Strong"  ,  [ "bar__block-green", 4]],
}

// Store the default thumb styles
const defaultThumbStyle = {
  background: 'hsl(252, 11%, 91%)', // Default color
  transform: 'scale(1)', // Default scale
  ouline: 'none',
};

const hoverThumbStyle = {
  background: 'hsl(248, 15%, 11%)', // Hover color
  transform: 'scale(1.1)', // Scale on hover
  outline: '2px solid hsl(127, 100%, 82%)',
};

// Function to update the thumb styles
function updateThumbStyle(style) {
  // WebKit
  slider.style.setProperty('--thumb-background', style.background);
  slider.style.setProperty('--thumb-transform', style.transform);
  slider.style.setProperty('--thumb-outline', style.outline);
}

function updateSlider(){
    const value = slider.value;
    const max = slider.max;
    const left = value * 100 / max;
    slider.style.setProperty('--progress-left', `${left}%`);
    updateSliderValue();
}

function updateSliderValue(){
    sliderValue.textContent = slider.value;
}

function passwCharSet() {
    let localCharSet = "";
    checkBoxOptions.forEach( (checkBox) => {
        if(checkBox.checked){
            localCharSet = localCharSet.concat(options[checkBox.value]);
        }
    });
    return localCharSet;
}

// Mouse enter event
slider.addEventListener('mouseenter', () => {
  updateThumbStyle(hoverThumbStyle);
});

// Mouse leave event
slider.addEventListener('mouseleave', () => {
  updateThumbStyle(defaultThumbStyle);
});
function calcPasswStrength(len, mult){
    const strength = len ** mult; // I know it's mult ** len -_-
    let result = 100000000;
    for(const combination in strengthObj){
        if(strength > parseInt(combination)){
            result = parseInt(combination);
        }
    }
    return result;
}

function generatePassword(charSet, len){
    let password = "";
    const charsetLen = charSet.length;
     for(i = 0; i < len; i++){
        password = password.concat(charSet.charAt(Math.floor(Math.random() * charsetLen)));
     }
     return password;
}

function fillStrengthBar(data){
    for(bar of strengthBarBlock){
        bar.className = "";
        bar.classList.add("bar__block");
    }
    for(i = 0; i < data[1]; i++){
        strengthBarBlock[i].classList.add(data[0]);
    }
}

function updateVisualFeedback(combinations){
    const result = strengthObj[combinations];
    passwordStrengthText.textContent = result[0];
    passwordStrengthText.classList.add('visible');
    fillStrengthBar(result[1]);
}

function displayPassword(password){
    if(password != ""){
        passwordDisplay.textContent = password;
        passwordDisplay.style.setProperty('color', 'var(--clr-text-primary)');
    }
}

function handleGenerateBtn(e){
    e.preventDefault();
    const localCharSet = passwCharSet();
    const localSliderValue = slider.value;
    const passStrength = calcPasswStrength(localCharSet.length, localSliderValue);
    let password = generatePassword(localCharSet, localSliderValue);
    updateVisualFeedback(passStrength);
    displayPassword(password);
    copyMessage.classList.remove('visible');
    
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            copyMessage.classList.add('visible');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

function handleCopyBtn(){
    const localPassword = passwordDisplay.textContent;
    copyToClipboard(localPassword);
}

slider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', handleGenerateBtn);
copyBtn.addEventListener('click', handleCopyBtn);