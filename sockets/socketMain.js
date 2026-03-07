//Where all our socket stuff will go
const io = require('../server').io;
const app = require('../server').app;

//Classes
const Player = require('./classes/Player')
const PlayerConfig = require('./classes/PlayerConfig')
const PlayerData = require('./classes/PlayerData')
const Orb = require('./classes/Orb')
//make an orbs array that will host all 500/5000 NON Player Orbs
//everytime the one is absorbed, the server will make a new one
const orbs = []
const settings = {
    defaultNumberOfOrbs: 500, // number of orbs to start with
    defaultSpeed: 6, //Player speed
    defaultSize: 6, //Player size 
    defaultZoom: 1.5, //as the player gets bigger the zoom needs to go out
    worldWidth: 500, //width of the game world
    worldHeight: 500, //height of the game world
    defaultGenericOrbSize: 5, //the size of the non-player orbs

}

const players = []
let ticktockinterval

//on server start, to make out initial 500
initGame()



io.on('connect', (socket)=> {

    socket.on('init', (playerObject, ackCallback) => {

        //tick-tock - issue an event to every connected socket that is playing the game, 30 times per second
        if(players.length === 0){ // someone is about to be added to players Start TickTocking
            ticktockinterval = setInterval(() => {
            io.to('game').emit('tick', players) // send the event to the "game" room

            }, 33)//1000/30 = 33.33333 1/30th of a second
        }

        socket.join('game'); // add this socket to game room
        //a player has connected
        const playerName = playerObject.playerName
        //make a playerConfig object - data specific to player that only the player needs to know
        const playerConfig = new PlayerConfig(settings)
        //make a playerData object - data that everyone needs to know
        const playerData = new PlayerData(playerName, settings)
        //a master player object to house both
        const player = new Player(socket.id, playerConfig, playerData)
        players.push(player)
    
        ackCallback({ orbs }) // send the orbs array back as an acknowledgement
    })
    socket.on('disconnect', () => {
        // remove the disconnected player from the array first
        const index = players.findIndex(p => p.id === socket.id)
        if (index !== -1) players.splice(index, 1)

        // if no players left, stop ticking
        if(players.length === 0){
            clearInterval(ticktockinterval)
        }
    })
})

function initGame(){
    //loop 500 times, and push a new Orb() onto our array
    for(let i = 0; i < settings.defaultNumberOfOrbs; i++){
        orbs.push(new Orb(settings));
    }
}