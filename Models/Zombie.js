var Person = require("./Person");

function Zombie(location, moves) {
    Person.call(this, location);

    this.moves = moves;
}

module.exports = Zombie;