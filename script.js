const cardBackImage = "photos/card-back.jpg";

const cardImages = [
  "photos/card1.jpg",
  "photos/card2.jpg",
  "photos/card3.jpg",
  "photos/card4.jpg",
  "photos/card5.jpg",
  "photos/card6.jpg",
  "photos/card7.jpg",
  "photos/card8.jpg",
  "photos/card9.jpg",
  "photos/card10.jpg"
];

const greetings = [
  "Wishing you the happiest birthday ever! 🎉",
  "You are loved more than you know 💖",
  "Another year, another blessing 🎂",
  "Your smile brightens every room 😍",
  "May your day be magical ✨",
  "You deserve all the love today ❤️",
  "Happiest birthday, beautiful soul 🌸",
  "You make life sweeter 🥰",
  "Cheers to your amazing journey 🍰",
  "I’m grateful for you every day 💕",
  "Let your heart shine today! ✨",
  "You make the world brighter 🌞",
  "Celebrate YOU today! 🎊",
  "Sending love and hugs 🤗",
  "You are amazing in every way 💖",
  "Joy, laughter, and cake for you 🍰",
  "Make a wish and dream big 🌟",
  "Today is all about YOU! 🎈",
  "Smiles, happiness, and fun 😄",
  "Here’s to another fabulous year! 🎉"
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let shuffledOrder = shuffle([...Array(10).keys()]);
let currentCard = 0;

function createSparkles(card) {
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.setProperty("--x", (Math.random() * 40 - 20) + "px");
    sparkle.style.setProperty("--y", (Math.random() * -40) + "px");
    card.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove());
  }
}

let greetingTimeout = null;

function showGreeting(i) {
  const box = document.getElementById("messageBox");
  const text = document.getElementById("messageText");

  // Always update the greeting text
  text.textContent = greetings[i];

  // Show the message
  box.classList.remove("hidden");
  setTimeout(() => box.classList.add("show"), 50);
}

function hideGreeting() {
  const box = document.getElementById("messageBox");
  box.classList.remove("show");
  setTimeout(() => box.classList.add("hidden"), 500);
}



let cardLocked = false;
let currentZoomedCard = null;

function createCards() {
  const container = document.querySelector(".cards-container");

  shuffledOrder.forEach((index, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url('${cardBackImage}')`;
    card.style.zIndex = 100 - i;
    card.style.setProperty("--angle", `${Math.random() * 20 - 10}deg`);
    container.appendChild(card);

    card.addEventListener("click", () => {
      // Block if card is not next or other cards are locked
      if (i > currentCard || (cardLocked && card !== currentZoomedCard)) return;

      cardLocked = true;
      currentZoomedCard = card;

      // Zoom and show photo if not already zoomed
      if (!card.classList.contains("zoomed")) {
        card.style.transform = "scale(1.5) rotate(0deg)";
        card.style.backgroundImage = `url('${cardImages[index]}')`;
        card.style.zIndex = 999;
        card.classList.add("zoomed");
        createSparkles(card);

        // Remove card after 2s
        setTimeout(() => {
          card.remove();
          hideGreeting(); // greeting disappears with card
          currentCard++;
          currentZoomedCard = null;

          // Cooldown: unlock next card only after 1 second
          setTimeout(() => {
            cardLocked = false;
          }, 500);

        }, 2000);
      }

      // Always show greeting
      showGreeting(index);
    });
  });
}




createCards();
