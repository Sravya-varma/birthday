
// ===================================
// 1. OPEN BIRTHDAY SURPRISE 🎁
// ===================================

function openSurprise() {
    document.getElementById("home").classList.add("hidden");

    const gift = document.getElementById("giftSection");
    gift.classList.remove("hidden");

    const music = document.getElementById("birthdayMusic");

    music.volume = 1;
    music.currentTime = 0;

    music.play().catch(error => {
        console.log("Audio playback error:", error);
    });

    createRosePetals();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===================================
// 2. SHOW MEMORIES GALLERY 📸
// ===================================

function showMemories() {
    document.getElementById("giftSection").classList.add("hidden");

    const gallery = document.getElementById("memories");
    gallery.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===================================
// 3. FALLING ROSE PETALS 🌹
// ===================================

let petalsStarted = false;

function createRosePetals() {
    if (petalsStarted) return;
    petalsStarted = true;

    const petals = ["🌹", "🌸", "🌺", "🌷"];

    setInterval(() => {
        const petal = document.createElement("div");

        petal.classList.add("petal");

        petal.innerHTML =
            petals[Math.floor(Math.random() * petals.length)];

        petal.style.left = Math.random() * 100 + "vw";
        petal.style.fontSize = (15 + Math.random() * 18) + "px";
        petal.style.animationDuration = (5 + Math.random() * 5) + "s";

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 10000);

    }, 350);
}


// ===================================
// 4. OPEN BIRTHDAY LETTER 🎀
// ===================================

function openBirthdayLetter() {
    const closedLetter = document.getElementById("closedLetter");
    const openLetter = document.getElementById("openLetter");

    if (!closedLetter || !openLetter) return;

    closedLetter.classList.add("ribbon-opening");

    setTimeout(() => {
        closedLetter.classList.add("hidden");
        closedLetter.classList.remove("ribbon-opening");

        openLetter.classList.remove("hidden");

        createFloatingHearts();

    }, 1000);
}


// ===================================
// 5. CLOSE BIRTHDAY LETTER 💌
// ===================================

function closeBirthdayLetter(event) {
    event.stopPropagation();

    const closedLetter = document.getElementById("closedLetter");
    const openLetter = document.getElementById("openLetter");

    openLetter.classList.add("hidden");
    closedLetter.classList.remove("hidden");
}


// ===================================
// 6. FLOATING HEARTS ❤️
// ===================================

let heartsStarted = false;

function createFloatingHearts() {
    if (heartsStarted) return;
    heartsStarted = true;

    const hearts = ["❤️", "💕", "💗", "💖"];

    setInterval(() => {
        const heart = document.createElement("div");

        heart.classList.add("floating-heart");

        heart.innerHTML =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (15 + Math.random() * 20) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);

    }, 700);
}


// ===================================
// 7. REAL FIREWORKS VARIABLES 🎆
// ===================================

let fireworksAnimation = null;
let fireworksRunning = false;
let fireworksEndTime = 0;

let rockets = [];
let particles = [];


// ===================================
// 8. SHOW FINAL BIRTHDAY SURPRISE 🎂
// ===================================

function showFinalSurprise() {
    const finalSurprise = document.getElementById("finalSurprise");

    if (!finalSurprise) return;

    finalSurprise.classList.remove("hidden");

    finalSurprise.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    startRealFireworks();
}


// ===================================
// 9. START REAL FIREWORKS
// ===================================

function startRealFireworks() {
    const canvas = document.getElementById("fireworksCanvas");

    if (!canvas) {
        console.error("Fireworks canvas is missing from HTML.");
        return;
    }

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    rockets = [];
    particles = [];

    fireworksRunning = true;

    if (fireworksAnimation) {
        cancelAnimationFrame(fireworksAnimation);
    }

    fireworksEndTime = performance.now() + 15000;

    let lastLaunch = 0;

    // Launch a rocket
    function launchRocket() {
        const x = Math.random() * canvas.width;

        rockets.push({
            x: x,
            y: canvas.height,
            previousY: canvas.height,
            targetY: canvas.height * (0.15 + Math.random() * 0.4),
            speed: 5 + Math.random() * 3,
            color: `hsl(${Math.random() * 360}, 100%, 65%)`
        });
    }

    // Create explosion particles
    function explode(rocket) {
        const particleCount = 90;

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 5;

            particles.push({
                x: rocket.x,
                y: rocket.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                radius: 1.5 + Math.random() * 2,
                color: rocket.color,
                gravity: 0.045
            });
        }
    }

    // Animate everything
    function animate(time) {
        if (!fireworksRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Launch new rockets
        if (
            time - lastLaunch > 500 &&
            time < fireworksEndTime
        ) {
            launchRocket();
            lastLaunch = time;
        }

        // Move rockets upwards
        for (let i = rockets.length - 1; i >= 0; i--) {
            const rocket = rockets[i];

            rocket.previousY = rocket.y;
            rocket.y -= rocket.speed;

            // Rocket glowing trail
            ctx.beginPath();
            ctx.moveTo(rocket.x, rocket.previousY);
            ctx.lineTo(rocket.x, rocket.y);

            ctx.strokeStyle = rocket.color;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = rocket.color;
            ctx.stroke();

            ctx.shadowBlur = 0;

            // Explode at target height
            if (rocket.y <= rocket.targetY) {
                explode(rocket);
                rockets.splice(i, 1);
            }
        }

        // Animate explosion sparks
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.vy += particle.gravity;

            particle.vx *= 0.99;
            particle.vy *= 0.99;

            particle.alpha -= 0.012;

            if (particle.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = particle.alpha;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = particle.color;
            ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Stop after fireworks finish
        if (
            time >= fireworksEndTime &&
            rockets.length === 0 &&
            particles.length === 0
        ) {
            fireworksRunning = false;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            return;
        }

        fireworksAnimation = requestAnimationFrame(animate);
    }

    fireworksAnimation = requestAnimationFrame(animate);
}


// ===================================
// 10. RESIZE FIREWORKS CANVAS
// ===================================

window.addEventListener("resize", function () {
    const canvas = document.getElementById("fireworksCanvas");

    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});


// ===================================
// 11. BLOW OUT BIRTHDAY CANDLES 🕯️
// ===================================

function blowCandles() {
    const flames = document.querySelectorAll(
        "#finalSurprise .flame"
    );

    flames.forEach(flame => {
        flame.style.display = "none";
    });

    const wishButton = document.getElementById("wishButton");
    const message = document.getElementById("birthdayMessage");

    if (!wishButton || !message) return;

    wishButton.classList.add("hidden");

    message.classList.remove("hidden");

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
