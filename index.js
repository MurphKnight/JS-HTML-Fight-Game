// Initializing the constants for the canvas
const canvas = document.querySelector('canvas')
const ct = canvas.getContext('2d')

// Resizing the Canvas
canvas.width = 1024
canvas.height = 576

ct.fillRect(0, 0, canvas.width, canvas.height)


const gravity = 0.98
class Sprite {
    // The order in which the parameters are given doesn't matter 
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.height = 150
        this.lastkey
    }

    draw() {
        ct.fillStyle = 'Red'
        ct.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0    
        } 
        else
            this.velocity.y += gravity
    }
}





const player = new Sprite({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0}
})

const enemy = new Sprite({
    position: {x: 400, y: 100},
    velocity: {x: 0, y: 0}
})





const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false }
}


function animate() {
    window.requestAnimationFrame(animate) // this creates an infinite loop
    ct.fillStyle = 'black'
    ct.fillRect(0, 0, canvas.width, canvas.height)
    
    player.update()
    enemy.update()


    // player movement
    player.velocity.x = 0

    if (keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
    }


    // enemy movement
    enemy.velocity.x = 0

    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }
    else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
    }
}

animate()







window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'w':
            player.velocity.y = -24
            //keys.w.pressed = true
            break
        
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowUp':
            enemy.velocity.y = -24
            break
    }
    console.log(event.key)
})


window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
    console.log(event.key)
})