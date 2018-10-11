const cards = [
  '👆 Add a new flashcard using the form above',
  '👈 Click the trashcan to remove a flashcard',
  '👇 Go through your flashcards by clicking the "Start Memorizing" button'
];

// define variables that reference elements on our page
const cardsList = document.getElementById('cards');
const cardsForm = document.forms[0];
const cardInput = cardsForm.elements['card'];
let numberOfCards = 0;

// a helper function that creates a list item for a given dream
const appendNewCard = function(card) {
  const newListItem = document.createElement('li');
  const cardIndex = numberOfCards++;
  newListItem.innerHTML = `<a href="#" class="delete-card">🗑</a> ${card}`;
  cardsList.appendChild(newListItem);
  newListItem['id'] = `card${cardIndex}`;
}

// iterate through every dream and add it to our page
cards.forEach( function(card) {
  appendNewCard(card);
});

// listen for the form to be submitted and add a new dream when it is
cardsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  cards.push(cardInput.value);
  appendNewCard(cardInput.value);

  // reset form 
  cardInput.value = '';
  cardInput.focus();
};

function deleteFlashCardEntry(event) {
  const cardContent = event.target.parentNode.innerHTML.replace('<a href="#" class="delete-card">🗑</a> ', '');
  const index = cards.indexOf(cardContent);
  console.log(index);
  cards.splice(index, 1);
  cardsList.removeChild(event.target.parentNode);
}

function showFlashCard() {
  const card = document.querySelector('.flashcard');
  const cardText = document.querySelector('.flashcard-text');
  card.classList.remove('hide');
  
  for (var i = 0; i < cards.length + 1; i++) {
    (function(i){
      setTimeout(function () {
        cardText.innerHTML = "";
        if (i < cards.length) {
          cardText.innerHTML = cards[i];
        }
        else {
          card.classList.add('hide');
        }
      }, i * 3000);
    }(i));
  }
}

const startButton = document.getElementById('start-cards');
startButton.addEventListener('click', showFlashCard);

const deleteButtons = document.querySelectorAll('.delete-card');
deleteButtons.forEach(button => button.addEventListener('click', deleteFlashCardEntry));