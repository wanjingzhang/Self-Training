SNOW.Sled = function (width,height) {

    this.init = function () {
        this.img = new Image();
        this.img.src = "images/sled.png";
        this.width =  width;
        this.height = height;
        this.disWid = 304;
        this.disHei = 280; 

        this.gravity =0.25,
        this.ix = 0;
        this.iy = 0;
        this.fr = 0;
        this.initialVy = SNOW.HEIGHT - 120;
        this.vy = SNOW.HEIGHT - 120; //y position
        this.oldVx = 50;
        this.vx = this.oldVx;
        this.jump = - 7.6; //jump height
        this.velocity = 0;
        this.rotation = 0;
        this.play = false;
        this.type = 'sled';

    }
    this.update = function () {  
        if (this.play) {
            this.velocity += this.gravity;
            this.vy += this.velocity ;

            // 前进速度加速度
            if (this.vy < (this.initialVy+20) && this.vx < (SNOW.WIDTH/2)) {
                //在屏幕范围内
                this.vx += 1;
                // console.log(this.vx); 
            } 

            if (this.vy >= this.initialVy) {
                this.vy = this.initialVy; 
                this.play = false;
            }  
            Sound.play_sound(Sound.soundAry.wing);
            // console.log('velocity=' + this.velocity + ' vy=' + this.vy + ' stop at='+ (SNOW.HEIGHT -80)); 
        }

        //回到原来状态
        if (SNOW.tapTime == 1) {
            // console.log("开始慢慢回到原来状态 this.vx = " + this.vx);
            if (this.vx > this.oldVx) {
                this.vx --;
            } 
        }

        if (SNOW.Input.tapped && !this.play) {
            this.play = true;
            this.velocity = this.jump; 
            
            // console.log("velocity=jump");
        }

        // console.log(this.vx);

    }
    this.render = function () {
        SNOW.Draw.Sprite(this.img, this.ix, this.iy,this.disWid,this.disHei, this.vx, this.vy, this.width, this.height, this.rotation);
        // SNOW.Draw.Image(this.img,88,200); 
        // SNOW.Draw.rect(this.ix,this.iy,this.width,this.height,'#ff0');
    }
}