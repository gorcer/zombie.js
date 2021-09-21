const Zombie = require('./Models/Zombie');
const Creature = require('./Models/Creature');
const StepService = require('./Services/StepService')
const Lostland  = require('./Models/Lostland');
const BloodService = require('./Services/BloodService');
const startOptions = require('./config.json');

var daysToSurvie = 100;

var zombies = [new Zombie(startOptions.posZombie, startOptions.moves)];
var creatures = startOptions.posCreatures.map((item) =>{
    return new Creature(item);
});

// Создаем мир
var land = new Lostland(startOptions.dimension);
// Селим зомби и живых
land.place(zombies);
land.place(creatures);

// Устанавливаем сервис отвечающий за заражение
land.setBloodService(BloodService);

// Устанавливаем сервис отвечающий за хождение
land.setStepService(StepService);

// Город засыпает, начинается ночь
land.bringANight(daysToSurvie);

