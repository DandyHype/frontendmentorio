const billInput = document.getElementById("bill__input");
const defaultTipBtns = document.querySelectorAll(".option__btn");
const customTipInput = document.getElementById("option__custom");
const nmbofpplInput = document.getElementById("nmbofppl__input");
const tipAmountPP = document.getElementById("tip__amount");
const totalAmountPP = document.getElementById("total__amount");
const resetBtn = document.querySelector(".reset__btn");
const errorMsg = document.querySelector(".form__errormsg");

const tipInteger = {
  "5%": 5,
  "10%": 10,
  "15%": 15,
  "20%": 20,
  "25%": 25,
  "50%": 50,
};

let tipSelected = 0;
let billAmount = 0;
let nmbofppl = 1;

let resultTipPP = 0;
let resultTotalPP = 0;

// Logic functions

function calculateOutput() {
  let total = 0;
  let tip = 0;
  tip = (billAmount * (tipInteger[tipSelected] || tipSelected)) / 100;
  total = billAmount + tip;
  resultTipPP = tip / nmbofppl;
  resultTotalPP = total / nmbofppl;
  updateScreen();
}

// Form manipulation functions

function resetTipBtns() {
  defaultTipBtns.forEach((button) => {
    button.dataset.active = "false";
  });
}

function resetForm() {
  resetScreen();
  billInput.value = "";
  nmbofpplInput.value = "";
  customTipInput.value = "";
  tipSelected = 0;
  resetTipBtns();
  resetBtn.dataset.active = "false";
}

function displayDBZError() {
  errorMsg.dataset.error = "true";
  nmbofpplInput.dataset.error = "true";
}

function resetErrorMsg(){
  errorMsg.dataset.error = "false";
  nmbofpplInput.dataset.error = "false";
}

// Screen Result functions

function updateScreen() {
  tipAmountPP.textContent = "$" + resultTipPP.toFixed(2);
  totalAmountPP.textContent = "$" + resultTotalPP.toFixed(2);
}

function resetScreen() {
  tipAmountPP.textContent = "$0.00";
  totalAmountPP.textContent = "$0.00";
}

// Handle Functions

function handleTipBtn(e) {
  e.preventDefault();
  resetTipBtns();
  e.target.dataset.active = "true";
  resetBtn.dataset.active = "true";
  tipSelected = e.target.textContent;
  calculateOutput();
}

function handleBillInput(e) {
  billAmount = parseFloat(e.target.value);
  resetBtn.dataset.active = "true";
  calculateOutput();
}

function handleNmbofpplInput(e) {
  nmbofppl = parseInt(e.target.value);
  resetErrorMsg();
  if (nmbofppl <= 0 || !nmbofppl) {
    return displayDBZError();
  }
  resetBtn.dataset.active = "true";
  calculateOutput();
}
function handleCustomInput(e) {
  tipSelected = parseInt(e.target.value);
  resetBtn.dataset.active = "true";
  resetTipBtns();
  calculateOutput();
}

// Event Listeners

defaultTipBtns.forEach((button) => {
  button.addEventListener("click", handleTipBtn);
});

resetBtn.addEventListener("click", () => {
  resetForm();
});

billInput.addEventListener("input", handleBillInput);

nmbofpplInput.addEventListener("input", handleNmbofpplInput);

customTipInput.addEventListener("input", handleCustomInput);
