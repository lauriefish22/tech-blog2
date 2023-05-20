const router = require('express').Router();
const { Post, User, Comments } = require('../models');




//users can access their posts if logged in
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({

            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // Passing serialized data and session flag into template
        res.render('dashboard', {
            posts: posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {

        res.status(500).json(err);
    }
});
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router 