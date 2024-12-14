const cards = [
	{
		id: 1,
		name: "mufasa",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/mufasa.jpg",
	},
	{
		id: 2,
		name: "hyenas",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/hyenas.jpg",
	},
	{
		id: 3,
		name: "pumba",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/pumba.jpg",
	},
	{
		id: 4,
		name: "simba",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/simba.jpg",
	},
	{
		id: 5,
		name: "timon",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/timon.jpg",
	},
	{
		id: 6,
		name: "nala",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/nala.jpg",
	},
	{
		id: 7,
		name: "priderock",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/priderock.jpg",
	},
	{
		id: 8,
		name: "rafiki",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/rafiki.jpg",
	},
	{
		id: 9,
		name: "scar",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/scar.jpg",
	},
	{
		id: 10,
		name: "zazu",
		src: "/projects/javascript/MemoryGame/folder-MemoryGame/images/zazu.jpg",
	},
];

let selectedDevice = "mobile";
let cardsToDisplay = [];
let flippedCards = [];
let matchedCards = [];
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

const cardsContainer = document.getElementById("cards-container");
const restartButton = document.getElementById("restart-button");
const turnIndicator = document.getElementById("turn-indicator");
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");
const winnerMessage = document.getElementById("winner-message");
const openingScreen = document.getElementById("opening-screen");
const gameContainer = document.getElementById("game-container");

document
	.getElementById("mobile-button")
	.addEventListener("click", () => startGame("mobile"));
document
	.getElementById("tablet-button")
	.addEventListener("click", () => startGame("tablet"));
document
	.getElementById("desktop-button")
	.addEventListener("click", () => startGame("desktop"));

function startGame(device) {
	selectedDevice = device;
	openingScreen.style.display = "none";
	gameContainer.style.display = "flex";
	if (selectedDevice === "mobile") {
		cardsToDisplay = shuffle(cards.slice(0, 5));
	} else if (selectedDevice === "tablet") {
		cardsToDisplay = shuffle(cards.slice(0, 8));
	} else {
		cardsToDisplay = shuffle(cards);
	}
	createCards();
}

function shuffle(cards) {
	return cards.sort(() => Math.random() - 0.5);
}

function createCards() {
	const shuffledCards = [...cardsToDisplay, ...cardsToDisplay];
	shuffledCards.forEach((card) => {
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.dataset.id = card.id;

		const imgElement = document.createElement("img");
		imgElement.src = card.src;
		cardElement.appendChild(imgElement);

		cardsContainer.appendChild(cardElement);

		cardElement.addEventListener("click", flipCard);
	});
}

function flipCard() {
	if (flippedCards.length === 2) return;
	const clickedCard = this;

	if (
		flippedCards.includes(clickedCard) ||
		clickedCard.classList.contains("flipped") ||
		clickedCard.classList.contains("matched")
	)
		return;

	clickedCard.classList.add("flipped");
	flippedCards.push(clickedCard);

	if (flippedCards.length === 2) {
		checkMatch();
	}
}

function checkMatch() {
	const [firstCard, secondCard] = flippedCards;
	const firstCardId = firstCard.dataset.id;
	const secondCardId = secondCard.dataset.id;

	if (firstCardId === secondCardId) {
		firstCard.classList.add("matched");
		secondCard.classList.add("matched");
		matchedCards.push(firstCard, secondCard);
		updateScore();
	} else {
		setTimeout(() => {
			firstCard.classList.remove("flipped");
			secondCard.classList.remove("flipped");
		}, 1000);
	}

	flippedCards = [];

	if (matchedCards.length === cardsToDisplay.length * 2) {
		setTimeout(() => {
			const winner = player1Score > player2Score ? "Player 1" : "Player 2";
			winnerMessage.textContent = `${winner} Wins!`;
		}, 500);
	} else {
		switchPlayer();
	}
}

function switchPlayer() {
	currentPlayer = currentPlayer === 1 ? 2 : 1;
	turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScore() {
	if (currentPlayer === 1) {
		player1Score++;
		player1ScoreElement.textContent = player1Score;
	} else {
		player2Score++;
		player2ScoreElement.textContent = player2Score;
	}
}

restartButton.addEventListener("click", () => {
	flippedCards = [];
	matchedCards = [];
	player1Score = 0;
	player2Score = 0;
	player1ScoreElement.textContent = player1Score;
	player2ScoreElement.textContent = player2Score;
	turnIndicator.textContent = "Player 1's Turn";
	winnerMessage.textContent = "";
	cardsContainer.innerHTML = "";
	createCards();
});
