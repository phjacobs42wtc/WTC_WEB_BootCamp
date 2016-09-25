define(['Config', 'Tank'], function(Config, Tank) {
  var Context = (function() {
    var cxt = null,
      index = 0,
      bInited = false,
      totalScore = 0,
      width = Config.MINWIDTH,
      height = Config.MINHEIGHT,
      tankWidth = Config.TANKWIDTH,
      tankHeight = Config.TANKHEIGHT,
      tankStep = Config.TANKSTEPS[0],
      bulletStep = Config.BULLETSTEPS[0],
      level = Config.LEVEL.ONE,
      style = Config.STYLE[0],
      myTank = null,
      enemyTanks = [],
      bulletRandoms = [],
      walls = [],
      scoreElem = document.getElementById('total-layer');
      
    function checkInRegion(region, point) {
      if (point[0] >= region[0] && point[0] <= region[2] && point[1] >= region[1] && point[1] <= region[3]) {
        return true;
      }
      return false;
    }
    
    function getBonus(score, x, y) {
      var elem = document.createElement('div');
      elem.innerHTML = '+' + score;
      elem.className = 'score-layer';
      elem.style.left = (x + 30) + 'px';
      elem.style.top = (y - 10) + 'px';
      document.body.appendChild(elem);
      totalScore += score;
      scoreElem.innerHTML = totalScore;
      setTimeout(function() {
        document.body.removeChild(elem);
      }, 500);
    }
    
    return {
      init: function(canvasId) {
        document.body.focus();
        if (bInited) {
          return;
        }
        if (!canvasId) {
          console.error('Please pass the parameter "canvasId".');
          return;
        }
        
        width = document.body.clientWidth > Config.MINWIDTH ? document.body.clientWidth: Config.MINWIDTH;
        height = document.body.clientHeight > Config.MINHEIGHT ? document.body.clientHeight : Config.MINHEIGHT;
        
        var canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
        cxt = canvas.getContext('2d');
        
        myTank = new Tank((width + tankHeight) / 2, (height + tankWidth) / 2, Config.DIRECTION.UP, this);
        myTank.step = Config.MYSTEP;
        myTank.color = style.MY;
        for (var i = 0; i < Config.ENEMYCOUNT; i++) {
          this.generateEnemyTank(i);
        }
        
        function tankHandler(e) {
          var bMove = false;
          switch (e.keyCode) {
            case 32:
              myTank.shoot();
              break;
            case 37:
              myTank.turn(Config.DIRECTION.LEFT);
              bMove = true;
              break;
            case 38:
              myTank.turn(Config.DIRECTION.UP);
              bMove = true;
              break;
            case 39:
              myTank.turn(Config.DIRECTION.RIGHT);
              bMove = true;
              break;
            case 40:
              myTank.turn(Config.DIRECTION.DOWN);
              bMove = true;
              break;
          }
          if (bMove) {
            myTank.move(true);
            myTank.draw();
          }
        }
        if (document.addEventListener) {
          document.addEventListener('keydown', tankHandler, false);
        } else if (document.attachEvent) {
          document.attachEvent('onkeydown', tankHandler);
        }
      },
      generateEnemyTank: function(index) {
        if (typeof index === 'undefined') {
          index = 1;
        }
        var tank = new Tank(0, index * 30, Config.DIRECTION.RIGHT, this);
        tank.color = style.ENEMY;
        enemyTanks.push(tank);
      },
      getContext: function() {
        return cxt;
      },
      getWidth: function() {
        return width;
      },
      getHeight: function() {
        return height;
      },
      getTankWidth: function() {
        return tankWidth;
      },
      getTankHeight: function() {
        return tankHeight;
      },
      setStyle: function(styleIndex) {
        styleIndex = parseInt(styleIndex);
        if (styleIndex >= 0 && styleIndex < Config.STYLE.length) {
          style = Config.STYLE[styleIndex];
        }
      },
      getLevel: function() {
        return level;
      },
      setLevel: function(levelIndex) {
        levelIndex = parseInt(levelIndex);
        if (levelIndex >= 0 && levelIndex < Config.LEVEL.length) {
          level = Config.LEVEL[levelIndex];
          tankStep = Config.TANKSTEPS[level];
          bulletStep = Config.BULLETSTEPS[level];
        }
      },
      getTankStep: function() {
        return tankStep;
      },
      getBulletStep: function() {
        return bulletStep;
      },
      run: function() {
        index = (++index) % Config.HZ;
        for (var i = 0, len = enemyTanks.length; i < len; i++) {
          enemyTanks[i].move();
        }
        this.draw();
        if (index % Config.HZ === 0) {
          var i = Math.floor(Math.random() * len);
          if (enemyTanks[i]) {
            enemyTanks[i].turn();
          }
          bulletRandoms = [];
          for (var i = 0, len = enemyTanks.length; i < len; i++) {
            bulletRandoms.push(Math.floor(Math.random() * Config.HZ));
          }
        }
        for (var i = 0, len = bulletRandoms.length; i < len; i++) {
          if (bulletRandoms[i] === index) {
            enemyTanks[i] && enemyTanks[i].shoot();
          }
        }
        for (var i = 0, len = enemyTanks.length; i < len; i++) {
          if (enemyTanks[i].checkShoot(myTank)) {
            return false;
          }
        }
        var count = myTank.checkShoot(enemyTanks);
        if (count) {
          getBonus(count, myTank.x, myTank.y);
          var temp = [];
          for (var i = 0, len = enemyTanks.length; i < len; i++) {
            if (enemyTanks[i].alive) {
              temp.push(enemyTanks[i]);
            }
          }
          enemyTanks = temp;
          for (var i = 0; i < count; i++) {
            this.generateEnemyTank();
          }
        }
        return true;
      },
      draw: function() {
        cxt.clearRect(0, 0, width, height);
        myTank.draw();
        for (var i = 0, len = enemyTanks.length; i < len; i++) {
          enemyTanks[i].draw();
        }
        for (var i = 0, len = walls.length; i < len; i++) {
          walls[i].draw();
        }
      }
    }
  })();
  return Context;
});