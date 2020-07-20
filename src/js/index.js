//*First bring in all DOM elements from HTML Ids
//*Second create local and global variables. We will have two arrays one to store DOM cards and other to store data like questions and answers
//*Third create the createCards function this creates a single card in the DOM with the containers etc...
//*Fourth this event listener toggles the show-answer class which works with CSS class .card.show-answer .inner-card that transforms rotateX(180deg) the cards also works with backface visibilty
//*Fifth create updateCurrentText function 1/3 etc... 
//*Sixth add nextBtn and prevBtn eventListeners
//*Seventh implement local storage to add new cards via getsCardData function
//*Eighth add and remove show class from add new card container eventListeners
//*Ninth now we actually add functionality to add cards by commenting out array and adding addCardBtn eventListener
//*Tenth create setCardsData function to add cards to localStorage and pass in cards parameter
//*Eleventh add clearBtn eventListener to clear cards from localStorage, set cards container to blank and reload window from JavaScript

const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
//look at commented out HTML code, we are constructing the cards-container in the DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
//add 1, by default it is 0
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
//use localStorage API when take it back out from lstorage need to parse it out as array isnce it is saved as a string first
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
//we are not just adding a new card to deck but overriding whole thing when saving onto localStorage, then turn into a string, reload page from JavaScript once cards saved in localStorage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event listeners

// Next button
//classList add adds class list and className overrides whatever class there is
//length is 3, arrays are zero based, take one away from length because length is 3 and it really is 0,1,2
//if stmt stops displaying cards if we next more times than number of cards available
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Prev button
//if stmt stops displaying cards if we click button more times than number of cards available
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
//Want values that come from the form, trim() method trims any whitespace
//if questions && answer are true then run newCard into createCard function up top then set question and answer inputs to blank
//then hide addContainer to add cards and push new card into cards array, setsCardsData(cardsData) adds new cards to localStorage
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});