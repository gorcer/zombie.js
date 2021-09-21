var Person = require("./Person");


function Creature(location) {
    Person.call(this, location);
}

module.exports = Creature;