define(['Config', 'Bullet'], function(Config, Bullet) {
  var Bullet = function(x, y, dir, context) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.context = context;
    this.cxt = context.getContext();
    this.step = context.getBulletStep();
    this.containerWidth = context.getWidth();
    this.containerHeight = context.getHeight();
    this.alive = true;
  };

  Bullet.prototype = {
    move: function() {
      if (this.alive) {
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
        if (this.x < 0 || this.x > this.containerWidth || this.y < 0 || this.y > this.containerHeight) {
          this.alive = false;
        }
        this.cxt.beginPath();
        this.cxt.arc(this.x, this.y, Config.BULLETRADIUS, 0, Math.PI * 2, true);
        this.cxt.fill();
      }
    }
  };
  return Bullet;
});
