const wordArray = ["attack speed", "cooldown", "dodge", "evade", "critical strike"];

function changeDynamicWord() {
    const dynamicWord = document.getElementById("dynamicWord");
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % wordArray.length;
        dynamicWord.textContent = wordArray[currentIndex];
    }, 3000); // Change word every 5 seconds
}


export default changeDynamicWord;