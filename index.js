// Initializing the constants for the canvas
const canvas = document.querySelector('canvas')
const ct = canvas.getContext('2d')

// Resizing the Canvas
canvas.width = 1024
canvas.height = 576

ct.fillRect(0, 0, canvas.width, canvas.height)


const gravity = 0.98

const background = new Sprite({
    position: {x: 0, y: 0},
    imageSrc: './img/background.png'
})


const player = new Fighter({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    type: 'player'
})

const enemy = new Fighter({
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



decreaseTimer()


function animate() {
    window.requestAnimationFrame(animate) // this creates an infinite loop
    ct.fillStyle = 'black'
    ct.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
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
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
    if ( enemy.isAttacking && rectangularCollision({attacker: enemy, rectangle2: player})){
        console.log('og')
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }


    // End game if player or enemy dies
    if (player.health <=0 || enemy.health <= 0){
        determineWinner({player, enemy, timerId})
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