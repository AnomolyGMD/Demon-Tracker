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

document.getElementById("filterForm").addEventListener("change", function() {
    const selectedRange = document.getElementById("difficultyFilter").value;
    filterDemonsByDifficulty(selectedRange);
});

function filterDemonsByDifficulty(range) {
    const demonList = document.getElementById("demonList");
    const demonItems = demonList.getElementsByTagName("li");

    for (let i = 0; i < demonItems.length; i++) {
        const demonText = demonItems[i].querySelector("span").textContent;
        const difficulty = parseInt(demonText.match(/\d+/)[0]);

        if (range === "all" || 
           (range === "1-3" && difficulty >= 1 && difficulty <= 3) || 
           (range === "4-6" && difficulty >= 4 && difficulty <= 6) || 
           (range === "7-10" && difficulty >= 7 && difficulty <= 10)) {
            demonItems[i].style.display = "";  // Show the item
        } else {
            demonItems[i].style.display = "none";  // Hide the item
        }
    }
}
