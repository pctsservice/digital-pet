// =========================
// PET CLASS (CORE GAME LOGIC)
// Handles state: hunger, happiness, age, life cycle
// =========================
class Pet {
    constructor(name) {
        this.name = name;
        this.hunger = 50;
        this.happiness = 50;
        this.age = 0;
        this.isAlive = true;
    }

    feed() {
        if (!this.isAlive || this.getStage() === "egg") return;
        this.hunger = Math.min(this.hunger + 10, 100);
    }

    play() {
        if (!this.isAlive || this.getStage() === "egg") return;
        this.happiness = Math.min(this.happiness + 10, 100);
    }

    tick() {
        if (!this.isAlive) return;

        this.hunger -= 5;
        this.happiness -= 3;
        this.age++;

        const maxAge = 15;

        if (
            this.hunger <= 0 ||
            this.happiness <= 0 ||
            this.age > maxAge
        ) {
            this.isAlive = false;
        }
    }

    getStage() {
        if (!this.isAlive) return "dead";

        if (this.age === 0) return "egg";
        if (this.age <= 5) return "baby";
        if (this.age <= 10) return "adult";

        return "elder";
    }
}

// =========================
// GAME INITIALISATION
// Creates the player’s pet instance
// =========================
const myPet = new Pet("Pixel");

// =========================
// UI UPDATE SYSTEM
// Syncs game state to the DOM (screen)
// =========================
function updateUI() {

    const img = document.getElementById("petImage");

    const stage = myPet.getStage();

    if (stage === "dead") {
        img.src = "assets/petstages/dead.png";
    }
    else if (stage === "egg") {
        img.src = "assets/petstages/egg.png";
    }
    else if (stage === "baby") {
        img.src = "assets/petstages/baby.png";
    }
    else if (stage === "adult") {
        img.src = "assets/petstages/adult.png";
    }
    else {
        img.src = "assets/petstages/elder.png";
    }

    document.getElementById("name").textContent = myPet.name;

    document.getElementById("hungerValue").textContent = myPet.hunger;
    document.getElementById("happinessValue").textContent = myPet.happiness;

    document.getElementById("hungerBar").style.width =
        myPet.hunger + "%";

    document.getElementById("happinessBar").style.width =
        myPet.happiness + "%";

    document.getElementById("age").textContent = myPet.age;

    const maxAge = 15;

    if (!myPet.isAlive && myPet.age > maxAge) {
        document.getElementById("status").textContent =
            "Died of old age 💀";
    }
    else if (!myPet.isAlive) {
        document.getElementById("status").textContent =
            "Dead 💀";
    }
    else {
        document.getElementById("status").textContent =
            "Alive 😊";
    }
}

// =========================
// USER INTERACTIONS
// Button controls for feeding and playing
// =========================
document.getElementById("feedBtn").addEventListener("click", () => {
    myPet.feed();
    updateUI();
});

document.getElementById("playBtn").addEventListener("click", () => {
    myPet.play();
    updateUI();
});

// =========================
// GAME LOOP
// Runs automatically over time (pet aging + stat decay)
// =========================
setInterval(() => {
    myPet.tick();
    updateUI();
}, 3000);

updateUI();
