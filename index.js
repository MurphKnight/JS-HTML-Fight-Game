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
    constructor({position, velocity, color = 'Red', type = 'enemy', offset}) {
        this.position = position
        this.velocity = velocity

        this.height = 150
        this.width = 50
        this.lastkey

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.type = type
        this.color = color
        this.isAttacking
    }

    draw() {
        // player box
        ct.fillStyle = this.color
        ct.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box for player
        if (this.isAttacking && this.type == 'player'){
            ct.fillStyle = 'Orange'
            ct.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }

        // attack box for enemy
        if (this.isAttacking && this.type == 'enemy'){
            ct.fillStyle = 'Orange'
            ct.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0    
        } 
        else
            this.velocity.y += gravity
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
} // 50:38





const player = new Sprite({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    type: 'player'
})

const enemy = new Sprite({
    position: {x: 400, y: 100},
    velocity: {x: 0, y: 0},
    offset: {x: -50, y: 0},
    color: 'Blue'
})





const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false }
}



function rectangularCollision({attacker, rectangle2}) {
    return ( attacker.attackBox.position.x + attacker.attackBox.width >= rectangle2.attackBox.position.x 
        && attacker.attackBox.position.x <= rectangle2.attackBox.position.x + rectangle2.width
        && attacker.attackBox.position.y + attacker.attackBox.height >= rectangle2.position.y
        && attacker.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
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


    // Detecting Collision
    if ( player.isAttacking && rectangularCollision({attacker: player, rectangle2: enemy})){
        console.log('go')
        player.isAttacking = false
    }
    if ( enemy.isAttacking && rectangularCollision({attacker: enemy, rectangle2: player})){
        console.log('og')
        enemy.isAttacking = false
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
        case ' ':
            player.attack()
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
        case 'ArrowDown':
            enemy.attack()
            break
    }
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
})