//set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
const canvas = document.getElementById("the-canvas");
const context = canvas.getContext("2d");
canvas.height = wHeight;
canvas.width = wWidth;
const player = {} //this will be all things 'this' player
let orbs = [] //this is a global for all non-player orbs

//put the modals into variables so we can interact with them.
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));

window.addEventListener('load', () => {
    //on page load, opne the login modal
    loginModal.show();
})

document.querySelector('.name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    player.name = document.querySelector('#name-input').value;
    document.querySelector('.player-name').innerHTML = player.name;
    console.log(player);
    loginModal.hide();
    spawnModal.show();
})

document.querySelector('.start-game').addEventListener('click', (e) => {
    spawnModal.hide();
    
    const elArray = Array.from(document.querySelectorAll('.hiddenOnStart'));
    elArray.forEach((el) => {
        el.removeAttribute('hidden');
    })
    init();
})