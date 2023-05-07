const sequelize = require('..config/connection');
const seedUsers = require('/userData');
const seedPosts = require('/postData');
const seedComments = require('commentData');

const allSeeds = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

allSeeds();