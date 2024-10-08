document.getElementById("demonForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const demonName = document.getElementById("demonName").value;
    const demonDifficulty = document.getElementById("demonDifficulty").value;

    addDemon(demonName, demonDifficulty);
    saveToLocalStorage();  // Save the updated list to localStorage

    document.getElementById("demonForm").reset();
});

function addDemon(name, difficulty) {
    const demonList = document.getElementById("demonList");
    const demonItem = document.createElement("li");
    
    demonItem.innerHTML = `<span>${name} (Difficulty: ${difficulty})</span> 
                           <button onclick="removeDemon(this)">Remove</button>`;
    
    demonList.appendChild(demonItem);
}

function removeDemon(button) {
    const demonItem = button.parentElement;
    demonItem.remove();
    saveToLocalStorage();  // Update localStorage when a demon is removed
}

function saveToLocalStorage() {
    const demonList = [];
    document.querySelectorAll("#demonList li").forEach(item => {
        const demonText = item.querySelector("span").textContent;
        const [name, difficultyText] = demonText.split(" (Difficulty: ");
        const difficulty = difficultyText.replace(")", "");
        demonList.push({ name, difficulty });
    });
    localStorage.setItem("demons", JSON.stringify(demonList));  // Save list to localStorage
}

function loadFromLocalStorage() {
    const savedDemons = JSON.parse(localStorage.getItem("demons"));
    if (savedDemons && Array.isArray(savedDemons)) {
        savedDemons.forEach(demon => {
            addDemon(demon.name, demon.difficulty);
        });
    } else {
        console.log("No demons found in localStorage or data is corrupted.");
    }
}

// Load demons from localStorage when the page is loaded
window.onload = loadFromLocalStorage;

function saveToLocalStorage() {
    const demonList = [];
    document.querySelectorAll("#demonList li").forEach(item => {
        const demonText = item.querySelector("span").textContent;
        const [name, difficultyText] = demonText.split(" (Difficulty: ");
        const difficulty = difficultyText.replace(")", "");
        demonList.push({ name, difficulty });
    });
    console.log("Saving to localStorage:", demonList); // Debugging log
    localStorage.setItem("demons", JSON.stringify(demonList));  // Save list to localStorage
}

function loadFromLocalStorage() {
    const savedDemons = JSON.parse(localStorage.getItem("demons"));
    console.log("Loaded from localStorage:", savedDemons); // Debugging log
    if (savedDemons && Array.isArray(savedDemons)) {
        savedDemons.forEach(demon => {
            addDemon(demon.name, demon.difficulty);
        });
    } else {
        console.log("No demons found in localStorage or data is corrupted.");
    }
}
