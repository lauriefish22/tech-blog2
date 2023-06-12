const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const sequelize = require('../config/connection.js');


//route for finding all posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "content", "date_created"],
        include: [{
            model: Comments,
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
router.get('/post/:id', async (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        ]
    })
    then(postData => {
        if (!postData) {
            res.status(404).json({ message: "No post with this ID" })
            return;
        }

        const post = postData.get({ plain: true });
        console.log(post);
        res.render('one-post', { post, loggedIn: req.session.loggedIn });

    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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

router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        ]
    })
    then(postData => {
        if (!postData) {
            res.status(404).json({ message: "No post with this ID" })
            return;
        }
        const post = postData.get({ plain: true });
        res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





module.exports = router