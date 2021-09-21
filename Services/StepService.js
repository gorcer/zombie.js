const Creature = require("../Models/Creature");

function StepService(map, dimension){

    
    this.walk = function (zombie) {

        var moves = zombie.moves.split("");    
        var step=[];   
        var newPlaceX=zombie.x; 
        var newPlaceY=zombie.y; 
        var maxPos=dimension-1;
        var result = {
            steps: [],
            lastStep: []
        };
        for (let i = 0; i < moves.length; i++) {
            
            // Конвертируем символы в сдвиг
            step = this.stepFromLetter(moves[i]);

            // Считаем новое положение
            newPlaceX = newPlaceX + step[0];
            newPlaceY = newPlaceY + step[1];

            // Проверяем выход за рамки
            if (newPlaceX < 0) newPlaceX = maxPos;
            if (newPlaceY < 0) newPlaceY = maxPos;
            if (newPlaceX > maxPos) newPlaceX = 0;
            if (newPlaceY > maxPos) newPlaceY = 0;

            result.steps.push([newPlaceX, newPlaceY]);
        }
        result.lastStep=[newPlaceX, newPlaceY];
        
        return result;
    }

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
    };
}

module.exports = StepService;