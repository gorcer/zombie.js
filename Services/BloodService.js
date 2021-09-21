const Zombie = require("../Models/Zombie");
/**
 * Сервис заражения, когда нибудь вырастет во что-то большее.
 * @param {Lostland} land 
 */
function BloodService(land) {
    this.land = land;

    this.infect = function(creature, zombie) {
        var zombie = new Zombie([creature.x, creature.y], zombie.moves);
       return zombie;
    }
}

module.exports = BloodService;