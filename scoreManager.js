var scoreManager = {
    
    currentScore: 0,
    highScore: localStorage.getItem('highscore'),
    livesRemaining: 3,

    addToScore: function(points){
        this.currentScore += points;
        if(this.currentScore >= this.highScore) this.highScore = this.currentScore;
    },

    renderScores: function(ctx){
        var oldFillStyle = ctx.fillStyle;
        ctx.fillStyle = 'red';
        g_ctx.fillText('HIGH SCORE', 180, 20);
        ctx.fillStyle = 'white';
        g_ctx.fillText(this.highScore, 220, 45);
        g_ctx.fillText(this.currentScore, 50, 45);
        ctx.fillStyle = oldFillStyle;
    },

    saveHighScore: function(){
        localStorage.setItem('highscore', this.highScore);
    },

    getHighScore: function(){
        return localStorage.getItem('highscore');
    },

    removeLive: function(){
        this.livesRemaining--;
    },

    reset: function(){
        if(this.currentScore > this.highScore){
            this.saveHighScore();
        }
        this.currentScore = 0;
        this.highScore = this.getHighScore();
        this.livesRemaining = 3;
    }
}