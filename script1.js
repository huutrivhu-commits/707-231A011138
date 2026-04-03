const gameBoard = document.getElementById('game-board');
const moveDisplay = document.getElementById('move-count');
const resetBtn = document.getElementById('reset-btn');

let moves = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const items = ['🌸', '💜', '✨', '🌙']; 
let cardsArray = [...items, ...items];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle(cardsArray);
    
    shuffledCards.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.framework = item;
        
        card.innerHTML = `
            <div class="front-face">${item}</div>
            <div class="back-face">?</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    moveDisplay.textContent = moves;
    
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetTurn();
    
    // Kiểm tra thắng cuộc
    if (document.querySelectorAll('.flip').length === cardsArray.length) {
        setTimeout(() => alert(`Chúc mừng Trí! Bạn đã thắng sau ${moves} lượt.`), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTurn();
    }, 1000);
}

function resetTurn() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

resetBtn.addEventListener('click', () => {
    moves = 0;
    moveDisplay.textContent = moves;
    createBoard();
});

// Khởi tạo game lần đầu
createBoard();