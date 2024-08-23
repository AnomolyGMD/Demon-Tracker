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
