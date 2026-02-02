// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Animation de coeurs qui tombent
function createFallingHeart() {
    const heartsContainer = document.getElementById("falling-hearts");
    const heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.innerHTML = "♡";
    
    // Position aléatoire
    heart.style.left = Math.random() * 100 + "vw";
    
    // Taille aléatoire
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + "px";
    
    // Durée aléatoire
    const duration = Math.random() * 3 + 4;
    heart.style.animationDuration = duration + "s";
    
    // Délai aléatoire
    heart.style.animationDelay = Math.random() * 2 + "s";
    
    heartsContainer.appendChild(heart);
    
    // Retirer le coeur après l'animation
    setTimeout(() => {
        heart.remove();
    }, (duration + 2) * 1000);
}

// Créer des coeurs régulièrement
setInterval(createFallingHeart, 400);

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

let yesClickCount = 0;
const messages = [
    "J'ai une question importante...",
    "Ça te dirait... qu'on soit plus que des amis ? ",
    "Genre... ensemble ensemble ? 💕",
    "Allez, sois ma copine ! 👺👺"
];

yesBtn.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
noBtn.parentElement.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

// YES is clicked

yesBtn.addEventListener("click", () => {
    yesClickCount++;

    if (yesClickCount < 4) {
        // Changer le message
        title.textContent = messages[yesClickCount];
        
        // Agrandir le bouton YES
        const yesScale = 1 + (yesClickCount * 0.7);
        yesBtn.style.transform = `scale(${yesScale})`;
        
        // Rétrécir le bouton NO
        const noScale = 1 - (yesClickCount * 0.2);
        noBtn.parentElement.style.transform = `scale(${noScale})`;
        
        // Animation de rebond
        yesBtn.style.animation = "bounce 0.5s";
        setTimeout(() => {
            yesBtn.style.animation = "";
        }, 500);
        
    } else if (yesClickCount === 4) {
        // Animation de célébration avant le message final
        yesBtn.style.transform = "scale(4)";
        yesBtn.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
        yesBtn.style.opacity = "0";
        
        // Faire disparaître le bouton NO aussi
        noBtn.parentElement.style.opacity = "0";
        noBtn.parentElement.style.transition = "opacity 0.5s ease-out";
        
        // Ajouter un petit délai avant d'afficher le résultat final
        setTimeout(() => {
            title.textContent = "Yippeeee!";
            catImg.src = "cat_dance.gif";
            
            // Animation d'apparition du message
            document.querySelector(".letter-window").classList.add("final");
            buttons.style.display = "none";
            
            const finalTextContainer = document.getElementById("final-text-container");
            finalTextContainer.style.display = "block";
            finalTextContainer.style.animation = "fadeInScale 0.8s ease-out";
        }, 600);
    }
});