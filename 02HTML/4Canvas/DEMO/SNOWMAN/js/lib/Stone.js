SNOW.Stone = function (x,y, w) {
    this.init = function () {
        this.vx = x;
        this.vy = y;
        this.width = w ;
        this.height = w;
        this.speed = -2;
        this.img = new Image();
        this.img.src = 'images/stone.png';
        this.width = 80;
        this.height = 80;
        this.type = 'stone';
        this.show = true 
    }

    this.update = function () {
        this.vx += this.speed;
        if (this.vx <= - this.width) {
            this.respawn();
        }
    }

    this.render = function () {
        if (this.show) {
            // SNOW.Draw.rect(this.vx, this.vy, this.width, this.height, '#000');;

            SNOW.Draw.Sprite(this.img, 0, 0, 200, 203, this.vx, this.vy, this.width/2, this.height/2, 0);
        }
    }

    this.respawn = function () {
        this.show = true;
        this.vx = SNOW.WIDTH;
        this.speed = -2 - SNOW.Speed;
    }
}
