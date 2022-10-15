const doors = document.querySelectorAll(".door");
const textResponse = document.querySelector(".text-response");
const btn = document.querySelector(".btn");
const prizeList = ['a new car', 'a new skateboard', 'a bag of rice' , '1 million dollars', '50 bucks', 'student debt relief', 'an apple', "an apple computer", 'an all expenses paid vacation', 'a subway card', 'a big screen tv', 'a bar of soap', 'a bar of gold', 'a bar of chocolate'];
let prizes = setPrizes();
let hasChosenDoor = false;

handleDoors();
btn.addEventListener('click', resetGame);

function handleDoors() {
    for(let i=0; i < doors.length; i++) {
        doors[i].addEventListener('click', handleDoorClick);
    }
}

function handleDoorClick(element) {
    const doorNum = element.target.textContent;
    const prize = prizes[doorNum-1];

    this.innerHTML = `<p>${prize}</p>`;
    this.removeEventListener('click', handleDoorClick);

    if(!hasChosenDoor) {
        textResponse.textContent = `You win ${prize}!`;
        btn.style.visibility = "visible";
        hasChosenDoor = true;
    }
}

function setPrizes() {
    const prizes = [];
    while(prizes.length < doors.length) {
        let index = Math.floor(Math.random() * prizeList.length);
        if(prizes.includes(prizeList[index])) {
            continue;
        } else {
            prizes.push(prizeList[index]);
        }
    }
    return prizes;
}

function resetGame() {
    btn.style.visibility = "hidden";
    textResponse.textContent = "Choose a door. Win a prize!";
    hasChosenDoor = false;

    const doors = document.querySelectorAll('.door');
    for(let i = 0; i < doors.length; i++) {
        doors[i].innerHTML = `<p class="number">${i+1}<p>`;
    }

    prizes = setPrizes();
    handleDoors();
}