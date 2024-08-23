document.getElementById("demonForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const demonName = document.getElementById("demonName").value;
    const demonDifficulty = document.getElementById("demonDifficulty").value;

    addDemon(demonName, demonDifficulty);

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
}

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
    if (savedDemons) {
        savedDemons.forEach(demon => {
            addDemon(demon.name, demon.difficulty);
        });
    }
}

// Load demons from localStorage when the page is loaded
window.onload = loadFromLocalStorage;
