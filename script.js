const cardBackImage = "photos/card-back.JPG";
const cardImages = [
  "photos/card1.jpg","photos/card2.jpg","photos/card3.jpg","photos/card4.jpg","photos/card5.jpg",
  "photos/card6.jpg","photos/card7.jpg","photos/card8.jpg","photos/card9.jpg","photos/card10.jpg"
];

const greetings = [
  "Wishing you the happiest birthday ever! 🎉","You are loved more than you know 💖",
  "Another year, another blessing 🎂","Your smile brightens every room 😍",
  "May your day be magical ✨","You deserve all the love today ❤️",
  "Happiest birthday, beautiful soul 🌸","You make life sweeter 🥰",
  "Cheers to your amazing journey 🍰","I’m grateful for you every day 💕",
  "Let your heart shine today! ✨","You make the world brighter 🌞",
  "Celebrate YOU today! 🎊","Sending love and hugs 🤗",
  "You are amazing in every way 💖","Joy, laughter, and cake for you 🍰",
  "Make a wish and dream big 🌟","Today is all about YOU! 🎈",
  "Smiles, happiness, and fun 😄","Here’s to another fabulous year! 🎉"
];

let shuffledOrder = [];
let currentCard = 0;
let greetingTimeout = null;
let cardLocked = false;

const music = document.getElementById("birthdayMusic");
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true }); // ensure music plays if autoplay blocked

function shuffle(array){ return array.sort(()=> Math.random()-0.5); }

function createSparkles(card, count=20){
  for(let i=0;i<count;i++){
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = Math.random()*100 + "%";
    sparkle.style.top = Math.random()*100 + "%";
    sparkle.style.setProperty("--x", (Math.random()*40-20) + "px");
    sparkle.style.setProperty("--y", (Math.random()*-40) + "px");
    card.appendChild(sparkle);
    sparkle.addEventListener("animationend", ()=> sparkle.remove());
  }
}

function showGreeting(i, card){
  const box = document.getElementById("messageBox");
  const text = document.getElementById("messageText");

  if(greetingTimeout) clearTimeout(greetingTimeout);

  text.textContent = greetings[i];

  const rect = card.getBoundingClientRect();
  let top = rect.top - 70;
  if(top<10) top = rect.bottom + 10;
  const left = rect.left + rect.width/2;

  box.style.top = `${top}px`;
  box.style.left = `${left}px`;
  box.style.transform = "translateX(-50%)";

  box.classList.remove("hidden");
  setTimeout(()=> box.classList.add("show"), 50);

  greetingTimeout = setTimeout(()=> hideGreeting(), 2000);
}

function hideGreeting(){
  const box = document.getElementById("messageBox");
  box.classList.remove("show");
  setTimeout(()=> box.classList.add("hidden"), 500);
}

function showFinalMessage(){
  const finalBox = document.getElementById("finalMessage");
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";

  finalBox.classList.remove("hidden");
  setTimeout(()=> finalBox.classList.add("show"), 50);

  for(let i=0;i<50;i++){
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.setProperty("--x", (Math.random()*300-150)+"px");
    sparkle.style.setProperty("--y", (Math.random()*300-150)+"px");
    finalBox.appendChild(sparkle);
  }
}

function createCards(){
  const container = document.querySelector(".cards-container");
  container.innerHTML="";
  shuffledOrder = shuffle([...Array(cardImages.length).keys()]);
  currentCard = 0;

  shuffledOrder.forEach((index,i)=>{
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url('${cardBackImage}')`;
    card.style.zIndex = 100 - i;
    card.style.setProperty("--angle", `${Math.random()*20-10}deg`);
    container.appendChild(card);

    card.addEventListener("click", ()=>{
      if(cardLocked || i>currentCard) return;

      cardLocked = true;

      const scale = window.innerWidth<600 ? 1.2 : 1.5;
      card.style.transform = `scale(${scale}) rotate(0deg)`;
      card.style.backgroundImage = `url('${cardImages[index]}')`;
      card.style.zIndex = 999;
      card.classList.add("zoomed");
      createSparkles(card);
      showGreeting(index, card);

      setTimeout(()=>{
        card.remove();
        hideGreeting();
        currentCard++;
        cardLocked = false;

        if(currentCard>=cardImages.length){
          showFinalMessage();
        }

      },2000);
    });
  });
}

// initialize
createCards();
