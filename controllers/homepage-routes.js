



router.get('./.', async (req, res) => {
    try {
        const postedPosts = await Post.findAll({
            include: [{ model: User }]
        });
        const posts = postedPosts.map((post) => post.get({ plain: true }));
        res.render('home', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.direct('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});