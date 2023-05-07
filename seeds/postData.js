const { Post } = require('../models');

const postData = [{
    title: "JavaScript",
    contents: "JavaScript is so much fun",
    user_id: 1,
},
{
    title: "HTML",
    contents: "HTML is great",
    user_id: 2,
},
{
    title: "CSS",
    contents: "CSS is the best",
    user_id: 3,
},
{
    title: "React",
    contents: "React is interesting",
    user_id: 4,
},
{
    title: "Mysql",
    contents: "Mysql is fantastic",
    user_id: 5,
},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;