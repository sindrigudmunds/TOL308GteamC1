var collisionManager = {

    checkCollision: function(x1, y1, x2, y2, size){
        if (x1 < x2 + size && x1 + size > x2 &&
            y1 < y2 + size && y1 + size > y2) {
                return true;
         }
         
        return false;
    },

    checkCollisions: function(player, objects){
        var playerX = player.cx;
        var playerY = player.cy;

        // Getum síðan gert sambærilegt check til að athuga hvort byssan
        // sé að collida við enemies
        for(var i = 0; i < objects.length; i++){
            var isCollision = this.checkCollision(playerX, playerY, objects[i].cx, objects[i].cy, 32)
            if(isCollision) return objects[i];
        }
        return false;
    }
}