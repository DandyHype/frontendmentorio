const themeSwitcher = document.getElementById("theme__switch");
const appContainer = document.querySelector(".main__app");
const appBodyContainer = appContainer.querySelector(".app__body");
const headerOption = document.querySelector(".header__option");
const switchSun = document.querySelector(".switch__lightimg");
const switchMoon = document.querySelector(".switch__darkimg");
const linkTheme = document.getElementById("themeStylesheet");

const optionBGColor = {
  HTML: "#FFF1E9",
  CSS: "#E0FDEF",
  JavaScript: "#EBF0FF",
  Accessibility: "#F6E7FF",
};

const optionId = {
  HTML: 0,
  CSS: 1,
  JavaScript: 2,
  Accessibility: 3,
};

let myJSONObject;
let questionNumber = 0;
let category;
let score = 0;

fetch("./data.json")
  .then((request) => {
    if (!request.ok) {
      console.log("Oops! Something went wrong.");
      return null;
    }
    return request.json();
  })
  .then((data) => {
    myJSONObject = data;
    initiateApp(myJSONObject);
  });

function initiateApp(data) {
  myJSONObject = data;
  renderHomePage(myJSONObject.quizzes);
}

const homeContainer = `<div class="app__description">
                            <div class="app__title">
                                <h2 class="title__greeting">Welcome to the</h2>
                                <h1 class="title__appname">Frontend Quiz!</h1>
                            </div>
                        <p class="description__instruction">Pick a subject to get started.</p>
                        </div>
                        <div class="app__options">
                            <div class="options__container">
                            </div>
                        </div>
                        `;

const descriptionContent = `<div class="app__description" style="justify-content: space-between;">
                                    <div class="description__text">
                                            <p class="text__questnumber">Question 1 of 10</p>
                                                <h3 class="text__question">
                                                </h3>
                                    </div>
                                    <div class="description__progressbar">
                                       <div class="progressbar__fill" style="width: 1%;">
                                        </div>
                                    </div>
                                </div>
                                <div class="app__options">
                                   <div class="options__container">
                                    </div>
                                     <div class="app__submit">
                                        <div class="submit__btn">Submit answer</div>
                                      </div>
                                       <div class="error__message">
                                              <img src="./assets/images/icon-error.svg" alt="" class="error__img">
                                              <p class="error__text">Please select an answer</p>
                                        </div>
                                </div>
                                `;
                                
const resultContent = `<div class="app__description">
<div class="app__title">
  <h2 class="title__greeting">Quiz completed</h2>
  <h1 class="title__appname">You scored...</h1>
</div>
</div>
<div class="app__results">
<div class="results__card">
  <div class="header__option">
    <div class="option__bg">
      <img
        class="option__img"
        src=""
        alt=""
      />
    </div>
    <p class="option__name"></p>
  </div>
  <p class="card__score"><span class="score__result"></span> out of 10</p>
</div>
<div class="app__submit">
  <div class="submit__btn">Play again</div>
</div>
</div>`;

function renderHomePage(quizzes) {
  appBodyContainer.innerHTML = homeContainer;
  const optionsContainer = appBodyContainer.querySelector(".options__container");
  quizzes.forEach((category) => {
    optionsContainer.innerHTML += `<div class="options__option">
                                             <div class="option__bg" style="background-color:${optionBGColor[category.title]};">
                                                <img class="option__img" src="${category.icon}" alt="">
                                            </div>
                                            <p class="option__name">${category.title}</p>
                                        </div>
                                        `;
  });

  const categories = optionsContainer.querySelectorAll(".options__option");
  categories.forEach((category) => {
    category.addEventListener("click", handleCategoryClick);
  });
}



function renderQuizzPage(cat) {
  category = cat;
  const firstQuestion = myJSONObject.quizzes[optionId[category]].questions[0];

  const headerContent = `<div class="option__bg" style="background-color:${optionBGColor[category]};">
          <img
            class="option__img"
            src="${myJSONObject.quizzes[optionId[category]].icon}"
            alt=""
          />
        </div>
        <p class="option__name">${myJSONObject.quizzes[optionId[category]].title}</p>`;
  headerOption.innerHTML = headerContent;

  appBodyContainer.innerHTML = descriptionContent;
  appBodyContainer.querySelector(".text__question").textContent = `${firstQuestion.question}`;
  renderAnswers(firstQuestion);
  const submitBtn = document.querySelector(".submit__btn");
  submitBtn.addEventListener("click", handleSubmitAnswer);
}


function handleCategoryClick(event) {
  const category = event.currentTarget;
  const categoryName = category.querySelector(".option__name").textContent;
  renderQuizzPage(categoryName);
}

// function handleOptionClick(event) {
//   const option = event.currentTarget;
// }

function handleSubmitAnswer() {
  const errorMsg = document.querySelector(".error__message");
  const nextBtn = document.querySelector(".submit__btn");
  if (document.querySelector(".option__radio:checked")) {
    errorMsg.style = "none";
    disableOptions();
    const myAnswer = document.querySelector(".option__radio:checked").closest(".options__option").querySelector(".option__name");
    renderFeedback(myAnswer);
    nextBtn.removeEventListener("click", handleSubmitAnswer);
    nextBtn.textContent = "Next question";
    nextBtn.addEventListener("click", handleNextQuestion);
  } else {
    errorMsg.style.visibility = "visible";
  }

  if(questionNumber == 9){
    const progressbar = document.querySelector(".progressbar__fill");
    progressbar.style.width = "100%";
    nextBtn.textContent = "Show Result";
    nextBtn.removeEventListener("click", handleNextQuestion);
    nextBtn.addEventListener("click", renderResultPage);
  }

}

function handleNextQuestion(){
  questionNumber++;
  const question = myJSONObject.quizzes[optionId[category]].questions[questionNumber];
  appBodyContainer.querySelector(".text__question").textContent = `${question.question}`;
  renderAnswers(question);
  const progressbar = document.querySelector(".progressbar__fill");
  progressbar.style.width = `calc(${questionNumber * 100 / 10}%)`;
  const submitBtn = document.querySelector(".submit__btn");
  submitBtn.removeEventListener("click", handleNextQuestion);
  submitBtn.textContent = "Submit Answer";
  submitBtn.addEventListener("click", handleSubmitAnswer);
}


function disableOptions(){
  const radioBtns = document.querySelectorAll(".option__radio");
    radioBtns.forEach((radio) => {
      radio.disabled = true;
    });

}

function renderAnswers(question){
  const optionsContainer = appBodyContainer.querySelector(".options__container");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    optionsContainer.innerHTML += `<label for="${String.fromCharCode(65 + index)}" class="options__option">
                                          <input class="option__radio" type="radio" name="answer" id="${index}">
                                     <div class="option__bg">
                                      <p class="letter__char">${String.fromCharCode(65 + index )}</p>
                                      </div>
                                      <p class="option__name"></p>
                                      </label>
            `;
    let optionNames = optionsContainer.querySelectorAll(".option__name");
    optionNames[optionNames.length - 1].textContent = `${option}`;
  });
  // const options = optionsContainer.querySelectorAll(".options__option");
  // options.forEach((option) => {
  //   option.addEventListener("click", handleOptionClick);
  // });
}

function renderResultPage(){
  appBodyContainer.innerHTML = resultContent;
  const catImage = appBodyContainer.querySelector(".option__img");
  const catName = appBodyContainer.querySelector(".option__name");
  const scoreSpan = appBodyContainer.querySelector(".score__result");
  const playAgainBtn = appBodyContainer.querySelector(".submit__btn");
  const catBackground = appBodyContainer.querySelector(".option__bg");
  catBackground.style = `background-color:${optionBGColor[category]};`;
  catImage.src = `${myJSONObject.quizzes[optionId[category]].icon}`;
  catName.textContent = `${myJSONObject.quizzes[optionId[category]].title}`
  scoreSpan.textContent = score;

  playAgainBtn.addEventListener("click", handlePlayAgain);
}

function handlePlayAgain(){
  questionNumber = 0;
  category = null;
  score = 0;
  const headerOption = document.querySelector(".header__option");
  headerOption.innerHTML = "";
  initiateApp(myJSONObject);
}

function renderFeedback(myAnswer){
  const options = document.querySelectorAll(".option__name");
  const correctAnswer = myJSONObject.quizzes[optionId[category]].questions[questionNumber].answer;
  for(let option of options){
    if(option.textContent == correctAnswer){
      option.closest(".options__option").appendChild(createCheckmark());
    }
    if(option.textContent == myAnswer.textContent && myAnswer.textContent == correctAnswer){
      score++;
      option.closest(".options__option").dataset.attribute = "correct";
    }
    if(option.textContent == myAnswer.textContent && myAnswer.textContent != correctAnswer){
      option.closest(".options__option").dataset.attribute = "incorrect";
      option.closest(".options__option").appendChild(createFailCross());
    }
  }
}

function createCheckmark(){
  const greenCheckmark = document.createElement("img");
  greenCheckmark.classList.add("success__img");
  greenCheckmark.src = "./assets/images/icon-correct.svg";
  return greenCheckmark;
}

function createFailCross(){
  const failCross = document.createElement("img");
  failCross.classList.add("fail__img");
  failCross.src = "./assets/images/icon-incorrect.svg";
  return failCross;
}

function handleThemeSwitch(event){
  const themeSwitch = event.currentTarget;
  if(themeSwitch.checked){
    switchSun.src = "./assets/images/icon-sun-light.svg";
    switchMoon.src = "./assets/images/icon-moon-light.svg";
    linkTheme.href = "./assets/css/darktheme.css";
  }
  if(!themeSwitch.checked){
    switchSun.src = "./assets/images/icon-sun-dark.svg";
    switchMoon.src = "./assets/images/icon-moon-dark.svg";
    linkTheme.href = "./assets/css/lighttheme.css";
  }

}

themeSwitcher.addEventListener("change", handleThemeSwitch);