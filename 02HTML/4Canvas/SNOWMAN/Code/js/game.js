// scene opening
window.Input = function () { 
    this.init = function () {
        SNOW.entities = []; 
        SNOW.entities.push(new SNOW.Nameinput(SNOW.WIDTH / 2, SNOW.HEIGHT / 2, 600, 224));
        SNOW.entities[0].init();
    } 

    this.update = function () {  
        SNOW.entities[0].update();
        if (SNOW.Input.tapped) {
            SNOW.changeState('Splash');
            SNOW.Input.trapped = false;
        } 
    }

    this.render = function () {  
    }
}

// scene let's start
window.Splash = function () {
    this.banner = new Image(); 
    if (SNOW.isOK()) {
        this.banner.src = "images/tap.svg"; 
    } 
    this.init = function () {
        // clear GC
        SNOW.GC();  
        if (SNOW.level < 3) { 
            SNOW.level++;
            SNOW.Speed++;  
        }    
    }

    this.update = function () { 
        if (SNOW.Input.tapped) {
            SNOW.changeState('Play');
            SNOW.Input.trapped = false;
        }
    }

    this.render = function () {  
        SNOW.Draw.Sprite(this.banner, 0, 0, 374,250, ~~((SNOW.WIDTH + 374/2)/2  ), ~~((SNOW.HEIGHT + 250/2)/2 ), 374,250, 0);
        SNOW.Draw.text('LEVEL ' + SNOW.level, SNOW.WIDTH / 2, SNOW.HEIGHT / 2, 12, 'black');
    }
}
 
/**
 * scene play 开始游戏
 */
window.Play = function () {
    this.init = function () {  
        SNOW.hideStaff();
        SNOW.entities = [];
        // Add entities  
        SNOW.route = new SNOW.Route(0, 0, 1800, 600, 1800);
        // 设置
        var i = 3;
        SNOW.diamonds = [];
        SNOW.stones = [];
        while (i--) {
            var diamond, stone;
            switch (SNOW.level) {
                case 1:
                    diamond = new SNOW.Diamond(i);
                    if (i < 2) { 
                        stone = new SNOW.Stone(i);
                    }
                    break;
                case 2:
                    diamond = new SNOW.Jug(i);
                    if (i < 2) {
                        stone = new SNOW.Cactus(i);
                    }
                    break;
                case 3:
                    diamond = new SNOW.Oxygen(i);
                    if (i < 2) {
                        stone = new SNOW.Can(i);
                    }
                    break; 
            } 
            
            SNOW.diamonds.push(diamond);
            SNOW.entities.push(diamond);  
            
            if (i < 2) {
                SNOW.stones.push(stone);
                SNOW.entities.push(stone);
            }
        }  
        switch (SNOW.level) {
            case 1:   
                SNOW.sled = new SNOW.Sled();
                SNOW.cocktail = new SNOW.Cocktail(3); 
                SNOW.entities.push(SNOW.cocktail); 
                SNOW.entities.push(SNOW.sled); 
                SNOW.snow.style.display = "block";
                break;
            case 2: 
                SNOW.sled = new SNOW.Sking();
                SNOW.cocktail = new SNOW.Cocktail(3);
                SNOW.entities.push(SNOW.cocktail);
                SNOW.entities.push(SNOW.sled); 
                break;
            case 3:
                SNOW.sled = new SNOW.Submarine();
                SNOW.cocktail = new SNOW.Cocktail(3);
                SNOW.entities.push(SNOW.cocktail);
                SNOW.entities.push(SNOW.sled);
                SNOW.bubbles.style.display = "block"; 
                break;  
        } 
        
        SNOW.entities.push(SNOW.route);
        var i = SNOW.entities.length;
        while (i--) {
            SNOW.entities[i].init();
        }   
        console.log(SNOW.entities); 
    }  
 

    this.update = function () {  
        // 一组钻石
        if (SNOW.diamonds) {
            if (!SNOW.diamonds[0].obj.show && !SNOW.diamonds[1].obj.show && !SNOW.diamonds[2].obj.show) {
                SNOW.distance.current++;
                console.log( "current=" + SNOW.distance.current );
                var i = 3;  
                while (i--) { 
                    SNOW.diamonds[i].respawn();  
                } 
                if (SNOW.distance.current > (SNOW.distance.step / 2) && SNOW.hp.locks > 0) {
                    SNOW.cocktail.respawn(); 
                }
            } 
        }
        
        
        // 一组障碍物
        if (SNOW.stones) {
            if (!SNOW.stones[0].obj.show && !SNOW.stones[1].obj.show) {
                var i = 2;
                while (i--) {
                    SNOW.stones[i].respawn();
                }
            }
        }
        

        if (SNOW.distance.current >= SNOW.distance.step && SNOW.level <= 3 && SNOW.hp.blood > 0) { // 大于最多屏， 升级一次
            if (SNOW.level === 3) {
                // 第三关过完结束上传游戏数据  
                SNOW.changeState('GameOver',true);
                SNOW.postData();
                SNOW.resetGame(-1);
                
            } else { 
                SNOW.changeState('Splash');
                SNOW.resetGame(SNOW.level); 
            } 
        } 

        //check for a collision if the user tapped on this game tick;
        var checkCollision = false;
        if (SNOW.Input.tapped) {
            SNOW.score.taps += 1;
            checkCollision = true;
        }
        var i = SNOW.entities.length;
        while (i--) {  
            SNOW.entities[i].update(); 
            
            if (i > 5) { continue; }
            // 排除不需要碰撞的物体。排除不显示的物体
            if ( SNOW.entities[i].obj.show === true) { 
                var hit = SNOW.Collides(SNOW.sled, SNOW.entities[i].obj);
                if (hit) { 
                    console.log(SNOW.entities[i].type);
                    switch (SNOW.entities[i].type) {
                        case 'stone':
                            SNOW.entities[i].obj.show = false;
                            SNOW.hp.blood -= SNOW.hp.bloodStep;  
                            SNOW.Sound.play_sound(1); 
                            if (SNOW.hp.blood <= 0) { 
                                SNOW.changeState('GameOver'); 
                                SNOW.postData();  
                                // SNOW.Sound.play_sound(3);  
                            }
                            break;
                        case 'diamond':
                            // 得分
                            SNOW.Sound.play_sound(0);  
                            SNOW.entities[i].obj.show = false;
                            SNOW.score.coins += SNOW.score.coinStep;  
                            break;  
                        case 'cocktail':
                            console.log('add blood');
                            SNOW.entities[i].obj.show = false;
                            SNOW.hp.blood < 100 ?
                                SNOW.hp.blood += SNOW.hp.bloodStep : null;
                            break;
                    }
 
                }
            } 
        }     
    }

    this.render = function () {
        SNOW.Draw.text('SCORE '+ SNOW.score.coins, 100, 20, 15, 'orange'); 
        SNOW.Draw.rect(SNOW.WIDTH - 130, 8, 42, 12, "white"); // bg
        SNOW.Draw.rect(SNOW.WIDTH - 129, 9, ~~(40*SNOW.hp.blood/100), 10, "orange");
        SNOW.Draw.text('HP' , SNOW.WIDTH - 146, 20, 15, 'orange');
    }
}
 
window.GameOver = function (com) {
    var play = false;  
    this.init = function () { 
        var that = this;
        play = false;
        var gameoverInterval;  
        SNOW.hideStaff();
        gameoverInterval = setInterval(function () {
            clearInterval(gameoverInterval);
            that.banner = new Image();
            if (com === true) {
                that.banner.src = "images/com.png";  
            } else {
                that.banner.src = "images/top.png";   
            }
            
            play = true;
        }, 500); 
        SNOW.Sound.removeEvent();
    }

    this.update = function () {  
        if (SNOW.Input.tapped && play == true) {  
            var x = SNOW.Input.x ;
            var y = SNOW.Input.y;  
            console.log('x= '+ x +' y='+ y );
            if( SNOW.isNotMobile && (x > 0.65 && x < 0.75) && (y > 0.55 && y < 0.75)  ){  
                SNOW.GC(); 
                SNOW.changeState('Splash');
                SNOW.resetGame(-1);
            } else if (!SNOW.isNotMobile) {
                SNOW.GC();
                SNOW.changeState('Splash');
                SNOW.resetGame(-1);
            }
        } 
    } 

    this.render = function () {
        if (this.banner) {
            SNOW.Draw.Image(this.banner, SNOW.WIDTH / 2 - 165, SNOW.HEIGHT / 2 - 120);
            
            var vx = SNOW.WIDTH / 2 - 95;
            var vy = SNOW.HEIGHT / 2 - 44;
            var pst = 18;
            var l = SNOW.rankings.length
            SNOW.Draw.text(SNOW.score.coins, SNOW.WIDTH / 2 + 160, SNOW.HEIGHT / 2 - 170 + 125, 15, 'black');
            if (l !== 0) {
                for (var i = 0;i<l;i++){ 
                    SNOW.Draw.text(SNOW.rankings[i].userName, vx, vy, 15, 'black');
                    SNOW.Draw.text(SNOW.rankings[i].userScore, vx + 100, vy, 15, 'black');
                    vy += pst;
                }  
            } 
        }
    }
}