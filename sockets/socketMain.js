//Where all our socket stuff will go
const io = require('../server').io;
const app = require('../server').app;

const Orb = require('./classes/Orb')
//make an orbs array that will host all 500/5000 NON Player Orbs
//everytime the one is absorbed, the server will make a new one
const orbs = []

//on server start, to make out initial 500
initGame()

io.on('connect', (socket)=> {
    socket.emit('init', {
        orbs
    })
})

function initGame(){
    //loop 500 times, and push a new Orb() onto our array
    for(let i = 0; i < 500; i++){
        orbs.push(new Orb());
    }
}