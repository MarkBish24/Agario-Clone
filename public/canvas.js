player.locX = Math.floor(500 * Math.random() + 10)
player.locY = Math.floor(500 * Math.random() + 10)


const draw = () => {

    // reset transform so translate doesn't accumulate between frames
    context.setTransform(1, 0, 0, 1, 0, 0)

    //clear rect clears out the canvas, so we can draw on a clear canvas next frame
    context.clearRect(0, 0, canvas.width, canvas.height)

    //clamp the screen/vp to the players location (x, y)
    const camX = -player.locX + canvas.width / 2
    const camY = -player.locY + canvas.height / 2
    context.translate(camX, camY)

    //draw all the players
    players.forEach(p => {
        context.beginPath()
        context.fillStyle = p.playerData.color;
        context.arc(p.playerData.locX,p.playerData.locY, p.playerData.radius, 0, 2 * Math.PI)//
        //arg1 and arg2 are center x and center y of the arc
        //arg3 radius of the circle
        context.fill()
        context.lineWidth = 3; // how wide to draw a line in pixels
        context.strokeStyle = 'rgb(0,255,0)'
        context.stroke()
    })

    //draw all the orbs
    orbs.forEach(orb=> {
        context.beginPath();
        context.fillStyle = orb.color
        context.arc(orb.locX, orb.locY,orb.radius,0,Math.PI*2)
        context.fill();
    })
    requestAnimationFrame(draw) // request animation frame is like a controlled loop

}

canvas.addEventListener('mousemove',(event)=>{
    console.log(event)
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

 

    player.xVector = xVector;
    player.yVector = yVector;
})
