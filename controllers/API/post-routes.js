const router = require('express').Router();
const { Post } = require('../../models/post.js');

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            creator_name: req.body.creator_name,
            date_created: req.body.date_created,

        });
        res.json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                creator_name: req.body.creator_name,
                date_created: req.body.date_created,

            },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (post > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router