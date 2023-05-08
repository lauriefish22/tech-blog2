const router = require('express').Router();
const { Post, User } = require('../models');





router.get('/homepage', async (req, res) => {
    try {
        const userData = await Post.findAll({
            where: {
                "username": req.session.username
            }, include: [User]
        }
        );
        const userPosts = userData.map((post) => post.get({ plain: true }));
        console.log(userPosts);
        res.render('all-posts', {
            userPosts,

        });

    } catch (err) {
        res.redirect('login');
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await Post.findByPk(req.params.id, {
//             include: [{
//                 model: Comment,
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             ]
//         },
//         );
//     } catch (err) {
//         console.error(err);
//         res.status(400).json(err);
//     }
// });

module.exports = router 