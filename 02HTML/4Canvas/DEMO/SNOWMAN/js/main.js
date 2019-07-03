var intervalTime = ~~(1000 / 20);
var interv; 
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {  
            clearInterval(interv);
            interv = setInterval(callback, intervalTime);   
        };
})();
/**
 * 输入状态捕捉
 */
SNOW.Input = {
    x: 0,
    y: 0,
    tapped: false,

    set: function (data) { 
        if (!this.tapped) {  
            // 添加声音事件
            if (SNOW.state == 'Splash') { 
                SNOW.Sound.addEvent();  
                SNOW.Sound.initPlay();
            }
            this.x = (data.pageX - SNOW.offset.left) / SNOW.WIDTH /SNOW.Scale;
            this.y = (data.pageY - SNOW.offset.top) /SNOW.HEIGHT /SNOW.Scale;
            this.tapped = true;    
            clearInterval(SNOW.tapInterval);

            SNOW.tapTime = 0;
            SNOW.tapInterval = setInterval(
                function () {
                    if (SNOW.tapTime == 0) {
                        SNOW.tapTime = 1;   
                        clearInterval(SNOW.tapInterval); 
                    } 
            }, 1000);  
        } 
    },
    stop: function () {
        this.tapped = false;
        clearInterval(SNOW.tapInterval);
    } 
}
  
/** 
 *  碰撞检测
 */
SNOW.Collides = function (object_1, object_2) {  
    if (~~(object_1.vx + object_1.width / 2 > object_2.vx && object_1.vx < ~~(object_2.vx + object_1.width / 2))
        && object_1.vy + object_1.height / 2 > object_2.vy
    ) {  
        return true;
    } 
}

// 姓名检测
SNOW.RecordName = function () { 
    SNOW.userName = document.querySelector('.userName').value; 
    if (SNOW.userName == '' || SNOW.userName.length < 1) {
        alert("Input your name please.");
    } else {
        SNOW.popBackground.style.display = "none";
        SNOW.inputContent.style.display = "none";
    }
}

// 回收新建的对象
SNOW.GC = function () {
    // clear GC 
    var i = SNOW.entities.length
    while (i--) {
        var t = SNOW.entities.splice(0, 1);
        for (var item in t) {
            delete t[item];
        }
        t = null;
    }
}
   
/**
 * 绘制方法，正方形、圆形、图片、矢量图形、半圆
 */
SNOW.Draw = {
    clear: function () {
        SNOW.ctx.clearRect(0, 0, SNOW.WIDTH, SNOW.HEIGHT);
    },
    rect: function (x, y, w, h, col) {
        SNOW.ctx.fillStyle = col;
        SNOW.ctx.fillRect(x, y, w, h);
    },
    circle: function (x, y, r, col) {
        SNOW.ctx.fillStyle = col;
        SNOW.ctx.beginPath();
        SNOW.ctx.moveTo(x, y);
        SNOW.ctx.arc(x, y, r, 0, Math.PI * 2, true);
        SNOW.ctx.closePath();
        SNOW.ctx.fill();
    },
    Image: function (img, x, y) { 
        SNOW.ctx.drawImage(img, x, y); 
    },
    Sprite: function (img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
        SNOW.ctx.save();
        SNOW.ctx.translate(destX, destY);
        SNOW.ctx.rotate(r * (Math.PI / 180));
        SNOW.ctx.translate(-(destX + destW / 2), -(destY + destH / 2));
        SNOW.ctx.drawImage(img,srcX, srcY, srcW, srcH, destX, destY, destW, destH);
        SNOW.ctx.restore();
  
    },
    // Arguments [246, 420, 20, "#050000"] (4)
    semiCircle: function (x, y, r, col) {
        SNOW.ctx.fillStyle = col;
        SNOW.ctx.beginPath();
        SNOW.ctx.arc(~~x, ~~y, r, 0, Math.PI, true);
        SNOW.ctx.closePath();
        SNOW.ctx.fill();
    },
    text: function (string,x,y,size,col) {
        SNOW.ctx.font = size + "px Arial";
        SNOW.ctx.fillStyle = col;
        SNOW.ctx.textAlign = "center";
        SNOW.ctx.fillText(string, ~~x, ~~y);
    }
}


window.addEventListener('load', function () { 
    SNOW.isNotMobile = !SNOW.isMobile();

    if (SNOW.isNotMobile) {
        window.addEventListener('resize', SNOW.resize, false); 
        SNOW.popBackground.style.display = "block";
        SNOW.inputContent.style.display = "block";
    } else {
        window.addEventListener('orientationchange', SNOW.changeOrientation, false);
        if (SNOW.isOK()) {
            SNOW.popBackground.style.display = "block";
            SNOW.inputContent.style.display = "block";
 
        }  
    }
    var loadInterval = setInterval(function () {
        clearInterval(loadInterval);
        SNOW.init();
    }, 200); 
}, false);
 

