SNOW.Cocktail = function (id) {
    this.init = function () { 
        this.id = id;
        this.vx = SNOW.WIDTH + 120;
        this.vy = SNOW.HEIGHT - 120;  
        this.src = 'images/l1/cocktail.svg';
        this.width = 662;
        this.height = 724;
        this.displayWidth = 20;
        this.displayHeight = 22;
        this.type = 'cocktail';
        this.drawType = 'sprite';
        this.show = false;
        this.obj = new Myobj();
        this.obj.init(this.id, this.vx, this.vy, this.width, this.height, this.displayWidth, this.displayHeight, this.src, this.type, this.drawType,this.show);
    }

    this.update = function () {
        if (this.obj.show) {
           this.obj.update(); 
        }
        
    }

    this.render = function () {
        if (this.obj.show) {
          this.obj.render();  
        }
        
    }

    this.respawn = function () { 
        this.obj.show = true;
        this.obj.vx = SNOW.WIDTH + 120; // 出现在金币后面
        SNOW.hp.locks--;  

        console.log('cocktail = respawn');
    }
}