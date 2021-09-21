function StepService(land, zombies, creatures){

    this.stepFromLetter = function(letter) {
        switch (letter) {
            case 'U':
              return [0, -1];
            case 'D':
              return [0, 1];              
            case 'L':
              return [-1, 0]
            case 'R':
              return [1, 0]
            default:
              return [0, 0]
          }
    },
    this.walk = function (land, zombie) {

        var moves = zombie.moves.split("");    
        var step=[];   
        var newPlaceX=0; 
        var newPlaceY=0; 
        for (let i = 0; i < moves.length; i++) {
            
            step = this.stepFromLetter(moves[i]);
            newPlaceX = zombie.x + step[0];
            newPlaceY = zombie.y + step[0];
            
        }
    }
}

module.exports = StepService;