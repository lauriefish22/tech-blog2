const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection.js');


//route for finding all posts
router.get("/homepage", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "content", "date_created"],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
        .then((postData) => {
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route for a single post
router.get('/:id', async (req, res) => {
    try {
        const postedPosts = await Post.findOne({
            where: { id: req.params.id },
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (postedPosts) {
            const post = postedPosts.get({ plain: true });
            console.log(post);
            res.render('one-post', { post, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//route to direct user to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//route to direct user to signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});







module.exports = router