function rectangularCollision({attacker, rectangle2}) {
    return ( attacker.attackBox.position.x + attacker.attackBox.width >= rectangle2.attackBox.position.x 
        && attacker.attackBox.position.x <= rectangle2.attackBox.position.x + rectangle2.width
        && attacker.attackBox.position.y + attacker.attackBox.height >= rectangle2.position.y
        && attacker.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}



function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
    }
    else if (player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
    }
    else {
        document.querySelector('#displayText').innerHTML = 'Enemy wins'
    }
}


let timer = 60
let timeId
function decreaseTimer() {
    timerId = setTimeout(  decreaseTimer, 1000  )
    if (timer > 0){
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    // When timer runs out, check who is the Winner
    else if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }
}