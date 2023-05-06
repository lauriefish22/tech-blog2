const router = require('express').Router();
const Post = require('../../models/post.js');

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            creator_name: req.body.creator_name,
            date_created: req.body.date_created,
            comments: '',
        });
        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.update(
            {
                title: req.body.title,
                contents: req.body.contents,
                creator_name: req.body.creator_name,
                date_created: req.body.date_created,
                comments: '',
            },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    };
});



module.exports = router;