const dashboardCards = document.querySelector(".dashbord__cards");
const tfMenu = document.querySelectorAll('.item__link');
let timeFrame = "Daily";
const prevText = {"Daily":"Yesterday", "Weekly":"Last Week", "Monthly":"Last Month"};



  function refreshDashboard(){
    fetch('./data.json').then((request) => {  
        if(!request.ok) {
          console.log('Oops! Something went wrong.');
          return null;
        }
        
        return request.json();
      }).then((data) => {
        dashboardCards.innerHTML =``;
        data.forEach(item => {
            dashboardCards.appendChild(createCard(item.title, item.timeframes));
        });
      });
  }

  function createCard(title, timeframes){
    const card = document.createElement('div');
    card.classList.add('cards__card');
    card.dataset.activity = title;
    card.innerHTML = `<div class="card__info">
            <div class="card__title"><p class="title__text">${title}</p>
              <svg class="title__moreinfo" width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                  fill="#BBC0FF"
                  fill-rule="evenodd"
                />
              </svg></div>
            <div class="card__hours">
              <p class="hours__now">${timeframes[timeFrame.toLowerCase()].current}hrs</p>
              <p class="hours__past">${prevText[timeFrame]} - ${timeframes[timeFrame.toLowerCase()].previous}hrs</p></div>
          </div>`
        return card;
  }

  tfMenu.forEach((link) => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        tfMenu.forEach((link) =>{
            link.dataset.active = 'false';
        })
        timeFrame = e.target.textContent;
        e.target.dataset.active = 'true';
        refreshDashboard();
    });
  });

  refreshDashboard();