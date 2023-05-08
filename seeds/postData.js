const { Post } = require('../models');

const postData = [{
    title: "JavaScript",
    content: "JavaScript is so much fun",
    user_id: 1,
},
{
    title: "HTML",
    content: "HTML is great",
    user_id: 2,
},
{
    title: "CSS",
    content: "CSS is the best",
    user_id: 3,
},
{
    title: "React",
    content: "React is interesting",
    user_id: 4,
},
{
    title: "Mysql",
    content: "Mysql is fantastic",
    user_id: 5,
},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;