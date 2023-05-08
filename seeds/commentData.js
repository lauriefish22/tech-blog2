const { Comment } = require('../models');

const commentData = [
    {
        comment_body: "I have never taken a bath.",
        user_id: 1,
        post_id: 2
    },
    {
        comment_body: "I have to belly buttons.",
        user_id: 2,
        post_id: 1
    },
    {
        comment_body: "My favorite song is Twinkle, Twinkle.",
        user_id: 3,
        post_id: 2
    },
    {
        comment_body: "I like to eat gummy bears.",
        user_id: 4,
        post_id: 3
    },
    {
        comment_body: 'I have 6 toes on my right foot.',
        user_id: 5,
        post_id: 4
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;