const socket = io.connect('http://localhost:9000');


const init = async () => {
    //send the player data to the server
    const initOrbs = await socket.emitWithAck('init', {
        playerName: player.name
    })
    setInterval(() => {
        socket.emit('tock', {
            xVector: player.xVector,
            yVector: player.yVector
        })
    }, 33)

    orbs = initOrbs.orbs

    draw() // draw function is in canvas stuff
}

socket.on('tick', (playersArray) => {
    console.log(players)
    players = playersArray;
})

init()