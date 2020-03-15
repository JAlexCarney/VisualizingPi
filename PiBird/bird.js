class Particle {

    constructor(position){
        this.pos = position;
        this.startPos = position.copy();
        this.angle = 0;
        this.color = 0;
        this.sizeFactor = 25;
        this.velocity = 0;
        this.rotationSpeed = 0;
        this.life = 0;
        this.decayRate = 0;
        this.size = 0;
        this.saturation = 1.0;
        this.value = 1.0;
        this.hue = 0.0;
    }

    emit(velocity, lifetime){
        this.randomizeVisual();
        this.pos = this.startPos.copy();
        this.velocity = velocity;
        this.rotationSpeed = this.velocity.mag() * 0.05;
        
        // life starts at 1 and goes down by decayRate each update.
        // lifetime measured in frames.
        this.life = 1;
        this.decayRate = 1/lifetime;
    }

    update(){
        this.move(this.velocity);
        this.rotate(this.rotationSpeed);

        // size over life follows -4(life-1)^2 + 1 (grows and then shrinks)
        this.size = (-4*((this.life - 0.5)**2)+1) * this.sizeFactor;
        this.life -= this.decayRate;
    }


    drawCircle(){
        push();
        translate(this.pos);
        rotate(this.angle);

        // legs and beak
        fill("#FF7F2A");
        triangle(0, 0, this.size, 0, 0, this.size);
        rect(this.size/2, this.size, this.size/4, this.size/2);
        rect(-this.size/2-this.size/4, this.size, this.size/4, this.size/2);

        // body
        fill(this.hue, this.saturation, this.value);
        triangle(0, -this.size, -this.size, this.size, this.size, this.size);

        // eye
        fill("#FF7F2A");
        circle(0, -this.size/4, this.size/8);

        pop();
    }

    drawSquare(){
        push();
        translate(this.pos);
        rotate(this.angle);

        // legs and beak
        fill("#FF7F2A");
        triangle(0, 0, this.size, 0, 0, this.size);
        rect(this.size/2, this.size, this.size/4, this.size/2);
        rect(-this.size/2-this.size/4, this.size, this.size/4, this.size/2);

        // body
        fill(this.hue, this.saturation, this.value);
        triangle(0, -this.size, -this.size, this.size, this.size, this.size);

        // eye
        fill("#FF7F2A");
        circle(0, -this.size/4, this.size/8);

        pop();
    }

    drawTriangle(){
        push();
        translate(this.pos);
        rotate(this.angle);
        noStroke();

        // legs and beak
        fill("#FF7F2A");
        triangle(0, -this.size/8, this.size, 0, 0, this.size);
        rect(this.size/4, this.size, this.size/4, this.size/4);
        rect(-this.size/4-this.size/4, this.size, this.size/4, this.size/4);

        // body
        fill(this.hue, this.saturation, this.value);
        triangle(0, -this.size, -this.size, this.size, this.size, this.size);

        // eye
        fill(this.hue, 1, 0.25);
        circle(0, 0, this.size/4);

        pop();
    }

    isDead(){
        if(this.life <= 0){
            return true;
        }
        return false;
    }

    isAlive(){
        if(this.life <= 0){
            return false;
        }
        return true;    
    }

    setColor(hue, sat, val)
    {
        this.hue = hue;
        this.saturation = sat;
        this.value = val;
    }

    setSaturation(sat){
        this.saturation = sat;
    }

    setValue(val){
        this.value = val;
    }

    randomizeVisual(){
        this.size = Math.random()*50 + 25;
        this.hue = Math.random();
        this.angle = Math.random() * Math.PI * 2;
    }

    move(vel){
        this.pos = this.pos.add(vel);
    }

    rotate(theta){
        this.angle += theta;
    }
}