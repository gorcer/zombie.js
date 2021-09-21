var Zombie = require('./Models/Zombie');
var Creature = require('./Models/Creature');
var StepService = require('./Services/StepService')
var Lostland  = require('./Models/Lostland');

var startOptions = {
    dimension: 4,
    posZombie: [1,1],
    posCreatures: [
        [3,3],
        [2,1],
        [0,2]
    ],
    moves: 'RDLU'
};

var zombies = [new Zombie(startOptions.posZombie, startOptions.moves)];
var creatures = startOptions.posCreatures.map((item) =>{
    return new Creature(item);
});
var land = Lostland(startOptions.dimension);

zombies.forEach((item)={
    StepService.walk(land, item);
});