///////////////////////////////////////////////////////////////////////////////////////////////////////////
class Sprite {
    // The order in which the parameters are given doesn't matter 
    constructor({position, imageSrc, scale=1, framesMax=1, frameCurrent=0, frameElapsed=0, frameHold=6, offset={x:0, y:0} }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = frameCurrent
        this.frameElapsed = frameElapsed
        this.frameHold = frameHold
        this.offset = offset
    }

    draw() {
        ct.drawImage(this.image, 
            this.frameCurrent * (this.image.width / this.framesMax), // Starting crop (X position)
            0, // Starting crop (Y position)
            this.image.width / this.framesMax, // End of crop (X position)
            this.image.height, // End of crop (X position)

            this.position.x - this.offset.x, // X position of image
            this.position.y - this.offset.y, // Y position of image
            (this.image.width / this.framesMax) * this.scale, // image width
            this.image.height*this.scale) // image height
    }

    animateFrames(){
        this.frameElapsed++

        if (this.frameElapsed % this.frameHold === 0) 
            if(this.frameCurrent < this.framesMax-1)
                this.frameCurrent++
        else{
            this.frameCurrent = 0
        }
    }

    update(){
        this.draw()
        this.animateFrames()
    }

} // end of Sprite class
///////////////////////////////////////////////////////////////////////////////////////////////////////////
class Fighter extends Sprite {
    // The order in which the parameters are given doesn't matter 
    constructor({position, velocity, color = 'Red', type = 'enemy',
                imageSrc, scale = 1, framesMax = 1, frameCurrent = 0, frameElapsed = 0, frameHold = 6, offset={x:0, y:0}}) {
        
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            frameCurrent,
            frameElapsed,
            frameHold,
            offset
        })

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
        this.health = 100
    }

    
    draw() {
        super.draw()
        // player box
        //ct.fillStyle = this.color
        //ct.fillRect(this.position.x, this.position.y, this.width, this.height)

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
        this.animateFrames()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95){
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
} // end of Fighter class
///////////////////////////////////////////////////////////////////////////////////////////////////////////
