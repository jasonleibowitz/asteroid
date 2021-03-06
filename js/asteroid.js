var Asteroid = function(position, angle, stage, id) {
  this.position = { x: position.x, y: position.y };
  this.speed = 20;
  this.stage = stage;
  this.velocity = this.setVel(angle);
  this.id = id;


  this.size = 3 + 2 * this.stage;
  this.color = '#ccc';
}

Asteroid.prototype = {
  wrapPosition: function(width, height) {
    while (this.position.x > width/2) this.position.x -= width;
    while (this.position.x < -width/2) this.position.x += width;
    while (this.position.y > height/2) this.position.y -= height;
    while (this.position.y < -height/2) this.position.y += height;
  },

  update: function(dt, width, height) {
    var dx = this.velocity.x * dt / 1000;
    var dy = this.velocity.y * dt / 1000;

    this.position.x += dx;
    this.position.y += dy;
    this.wrapPosition(width, height);
  },

  setVel: function(angle) {
    return {
      x: (this.speed - 5 * this.stage) * Math.cos(PI * angle / 180),
      y: -(this.speed - 5 * this.stage) * Math.sin(PI * angle / 180)
    }
  },

  die: function() {
    var asteroidDeath = new CustomEvent('asteroidDeath', { 'detail': this.id });
    dispatchEvent(asteroidDeath);
  }
}
