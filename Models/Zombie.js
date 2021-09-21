var TwoFooted = require("./TwoFooted");

function Zombie(location, moves) {
    TwoFooted.call(this, location);

    this.moves = moves;
}

module.exports = Zombie;