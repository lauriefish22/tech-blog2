const sequelize = require('../config/connection.js');
const seedUsers = require('./userData.js');
const seedPosts = require('./postData.js');
const seedComments = require('./commentData.js');

const allSeeds = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

allSeeds();