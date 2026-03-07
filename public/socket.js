const socket = io.connect('http://localhost:9000');


const init = async () => {
    //send the player data to the server
    const initOrbs = await socket.emitWithAck('init', {
        playerName: player.name
    })

    orbs = initOrbs.orbs

    draw() // draw function is in canvas stuff
}

socket.on('initReturn', (initData) => {
    console.log(initData)
    orbs = initData.orbs
})