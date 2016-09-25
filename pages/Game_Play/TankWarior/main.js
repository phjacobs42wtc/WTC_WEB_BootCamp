require(['Config', 'Context'], function(Config, Context) {
  var duration = 1000 / Config.HZ;
  Context.init('myCanvas');
  function run() {
    if (Context.run()) {
      setTimeout(run, duration);
    } else {
      alert('Game Over');
    }
  }
  run();
});