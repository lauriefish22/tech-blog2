const router = require('express').Router();
const { User, Post, Comment } = require('../models');



router.get('/', async (req, res) => {
    try {
        const user = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }, include: [{
                model: comments,
                include: {
                    model: user,
                    attributes: ['user_name']
                }
            }]
        },
        );
        const userPosts = user.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            userPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Post.findByPk(req.params.id, {
            include: [{
                model: comments,
                include: {
                    model: user,
                    attributes: ['user_name']
                }
            },
            {
                model: user,
                attributes: ['user_name']
            }]
        },
        );
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

