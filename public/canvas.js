const init = () => {
    
}

let randomX = Math.floor(500 * Math.random() + 10) // horizontal axi
let randomY = Math.floor(500 * Math.random() + 10) // horizontal axi
context.beginPath()
context.fillStyle = 'rgb(255,0,0)'
context.arc(randomX,randomY, 10, 0, 2 * Math.PI)//
//arg1 and arg2 are center x and center y of the arc
//arg3 radius of the circle
context.fill()
context.lineWidth = 3; // how wide to draw a line in pixels
context.strokeStyle = 'rgb(0,255,0)'
context.stroke()

console.log(randomX, randomY)

const draw = () => {

}