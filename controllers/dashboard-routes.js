const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth.js');
const sequelize = require('../config/connection.js');


//users can access their posts if logged in
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'date_created'],
        include: [{
            model: Comments,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
        .then((postData) => {
            const posts = postData.map((post) => post.get({ plain: true }));
        })
        .catch((err) => {
            console.log(err);
            res.render('dashboard', {
                posts,
                loggedIn: true
            });
        });

    router.get('/update/:id', withAuth, (req, res) => {
        Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'content', 'date-created'],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comments,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        })
            .then((postData) => {
                if (!postData) {
                    res.status(404).json({ message: 'No post with this ID' });
                }


                const post = postData.get({ plain: true });
                res.render('update-post', {
                    post,
                    logged_in: true
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });

    router.get('/login', (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('login');
    });



    module.exports = router 