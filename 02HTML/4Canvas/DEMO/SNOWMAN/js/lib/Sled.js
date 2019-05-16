SNOW.Sled = function () {

    this.init = function () {
        this.img = new Image();
        this.img.src = "images/sled3.png";
        this.width = 100;
        this.height = 92;

        this.gravity = 0.25,
        this.ix = 0;
        this.iy = 0;
        this.fr = 0;
        this.vy = SNOW.HEIGHT - 80; //y position
        this.vx = 70;
        this.jump = -7.6; //jump height
        this.velocity = 0;
        this.rotation = 0;
        this.play = false;
        this.type = 'sled';

    }
    this.update = function () { 

        if (this.play) {
            this.velocity += this.gravity;
            this.vy += this.velocity;

            // 前进速度加速度
            if (this.velocity < 0 && this.vx < (SNOW.WIDTH-70)) {
                //在屏幕范围内
                this.vx -= this.velocity / 2;
                // console.log(this.vx);
                  
            } 
            if (this.vy >= SNOW.HEIGHT - 80) {
                this.vy = SNOW.HEIGHT - 80;
                 
                this.play = false;
            }  

            // console.log('velocity=' + this.velocity + ' vy=' + this.vy + ' stop at='+ (SNOW.HEIGHT -80)); 
        }

        //回到原来状态
        if (SNOW.tapTime == 1) {
            // console.log("开始慢慢回到原来状态 this.vx = " + this.vx);
            if (this.vx > 70) {
                this.vx --;
            } 
        }

        if (SNOW.Input.tapped && !this.play) {
            this.play = true;
            this.velocity = this.jump;
            // console.log("velocity=jump");
        }

    }
    this.render = function () {
        SNOW.Draw.Sprite(this.img, this.ix, this.iy, this.width, this.height, this.vx, this.vy, this.width, this.height, this.rotation);
        // SNOW.Draw.Image(this.img,88,200); 
        // SNOW.Draw.rect(this.ix,this.iy,this.width,this.height,'#ff0');
    }
}