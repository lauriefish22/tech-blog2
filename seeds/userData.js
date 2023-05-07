const { User } = require('../models');

const userData = [
    {
        "username": "Bugs Bunny",
        "password": "carrot"
    },
    {
        "username": "Barney",
        "password": "dinosaur"
    },
    {
        "username": "Papa Smurf",
        "password": "smurfette"
    },
    {
        "username": "Big Bird",
        "password": "yellow"
    },
    {
        "username": "Charlie Brown",
        "password": "snoopy"
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers