var collisionManager = {

    checkCollision: function(x1, y1, x2, y2, size){
        if (x1 < x2 + size && x1 + size > x2 &&
            y1 < y2 + size && y1 + size > y2) {
                return true;
         }

        return false;
    },

    checkGunCollision: function(gun, enemy){
      if (enemy._isDeadNow) {
        return false;
      }
        if (gun.x < enemy.cx + 32 &&
            gun.x + gun.width > enemy.cx &&
            gun.y < enemy.cy + 32 &&
            gun.height + gun.y > enemy.cy) {
             return true;
         }
         console.log(gun);
         console.log(enemy);
         return false;
    },

    checkCollisions: function(player, objects){
        var playerX = player.cx;
        var playerY = player.cy;

        // Getum síðan gert sambærilegt check til að athuga hvort byssan
        // sé að collida við enemies
        for(var i = 0; i < objects.length; i++){
            if (objects[i]._isDeadNow) {
              continue;
            }
            var isCollision = this.checkCollision(playerX, playerY, objects[i].cx, objects[i].cy, 32)
            if(isCollision) return objects[i];
        }
        return false;
    },

    checkGunCollisions: function(gun, enemies){
        // Getum síðan gert sambærilegt check til að athuga hvort byssan
        // sé að collida við enemies
        for(var i = 0; i < enemies.length; i++){
            var isCollision = this.checkGunCollision(gun, enemies[i])
            if(isCollision) return enemies[i];
        }
        return false;
    }
}
