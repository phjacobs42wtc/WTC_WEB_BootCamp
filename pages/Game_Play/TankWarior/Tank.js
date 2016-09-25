define(['Config', 'Bullet'], function(Config, Bullet) {
  var Tank = function(x, y, dir, context) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.alive = true;
    this.dying = false;
    this.context = context;
    this.color = Config.DEFCOLOR;
    this.cxt = context.getContext();
    this.step = context.getTankStep();
    this.width = context.getTankWidth();
    this.height = context.getTankHeight();
    this.containerWidth = context.getWidth();
    this.containerHeight = context.getHeight();
    this.bullets = [];
  };
  Tank.prototype = {
    move: function(bManual) {
      if (this.alive) {
        var needTurn = false;
        switch (this.dir) {
          case Config.DIRECTION.LEFT:
              this.x -= this.step;
              break;
          case Config.DIRECTION.UP:
              this.y -= this.step;
              break;
          case Config.DIRECTION.RIGHT:
              this.x += this.step;
              break;
          case Config.DIRECTION.DOWN:
              this.y += this.step;
              break;
        }
        if (this.x < 0) {
          this.x = 0;
          needTurn = true;
        }
        var width = this.width,
          height = this.height;
        if (this.dir === Config.DIRECTION.UP || this.dir === Config.DIRECTION.DOWN) {
          width = this.height;
          height = this.width;
        }
        if (this.x + width > this.containerWidth) {
          this.x = this.containerWidth - width;
          needTurn = true;
        }
        if (this.y < 0) {
          this.y = 0;
          needTurn = true;
        }
        if (this.y + height > this.containerHeight) {
          this.y = this.containerHeight - height;
          needTurn = true;
        }
        if (needTurn && !bManual) {
          this.turn();
        }
      }
    },
    draw: function() {
      if (this.alive) {
        this.cxt.fillStyle = this.color;
        switch (this.dir) {
          case Config.DIRECTION.LEFT:
              this.cxt.fillRect(this.x, this.y, this.width, 5);
              this.cxt.fillRect(this.x, this.y + 15, this.width, 5);
              this.cxt.fillRect(this.x, this.y + 9, 15, 2);
              this.cxt.fillRect(this.x + 5, this.y + 6, 20, 8);
              break;
          case Config.DIRECTION.UP:
              this.cxt.fillRect(this.x, this.y, 5, this.width);
              this.cxt.fillRect(this.x + 15, this.y, 5, this.width);
              this.cxt.fillRect(this.x + 9, this.y, 2, 15);
              this.cxt.fillRect(this.x + 6, this.y + 5, 8, 20);
              break;
          case Config.DIRECTION.RIGHT:
              this.cxt.fillRect(this.x, this.y, this.width, 5);
              this.cxt.fillRect(this.x, this.y + 15, this.width, 5);
              this.cxt.fillRect(this.x + 15, this.y + 9, 15, 2);
              this.cxt.fillRect(this.x + 5, this.y + 6, 20, 8);
              break;
          case Config.DIRECTION.DOWN:
              this.cxt.fillRect(this.x, this.y, 5, this.width);
              this.cxt.fillRect(this.x + 15, this.y, 5, this.width);
              this.cxt.fillRect(this.x + 9, this.y + 15, 2, 15);
              this.cxt.fillRect(this.x + 6, this.y + 5, 8, 20);
              break;
        }
        for (var i = 0, len = this.bullets.length; i < len; i++) {
          this.bullets[i].move();
        }
      } else if (this.dying) {
        
      }
    },
    turn: function(dir) {
      if (dir) {
        this.dir = dir;
      } else {
        this.dir = Math.ceil(Math.random() * 4);
      }
    },
    getBulletPos: function() {
      var x = 0,
        y = 0;
      switch (this.dir) {
        case Config.DIRECTION.LEFT:
            x = this.x;
            y = this.y + 9;
            break;
        case Config.DIRECTION.UP:
            x = this.x + 9;
            y = this.y;
            break;
        case Config.DIRECTION.RIGHT:
            x = this.x;
            y = this.y + 9;
            break;
        case Config.DIRECTION.DOWN:
            x = this.x + 9;
            y = this.y;
            break;
      }
      return {
        x: x,
        y: y
      };
    },
    shoot: function() {
      var pos = this.getBulletPos();
      this.bullets.push(new Bullet(pos.x, pos.y, this.dir, this.context));
    },
    beShot: function() {
      this.alive = false;
    },
    clearBullets: function() {
      var bullets = [];
      for (var i = 0, len = this.bullets.length; i < len; i++) {
        if (this.bullets[i].alive) {
          bullets.push(this.bullets[i]);
        }
      }
      this.bullets = bullets;
    },
    checkShoot: function(tanks) {
      var regions = [],
        bullet = null,
        bInRegion = false,
        result = 0;
      if (!(tanks instanceof Array)) {
        tanks = [tanks];
      }
      for (var i = 0, len = tanks.length; i < len; i++) {
        regions.push(tanks[i].getRegion());
      }
      for (var i = 0, len = regions.length; i < len; i++) {
        for (var j = 0, len1 = this.bullets.length; j < len1; j++) {
          bullet = this.bullets[j];
          if (bullet.alive) {
            bInRegion = this.checkInRegion(regions[i], [bullet.x, bullet.y]);
            if (bInRegion) {
              tanks[i].beShot();
              result++;
              break;
            }
          }
        }
      }
      return result;
    },
    getRegion: function() {
      return [this.x, this.y, this.x + this.width, this.y + this.height];
    },
    checkInRegion: function(region, point) {
      if (point[0] >= region[0] && point[0] <= region[2] && point[1] >= region[1] && point[1] <= region[3]) {
        return true;
      }
      return false;
    }
  };
  return Tank;
});