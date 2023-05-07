const router = require('express').Router();
const { User } = require('../../models/user.js');


router.post('/', async (req, res) => {
    try {
        const UserData = await User.create(req.body);
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(UserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const newUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!UserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' });
            return;
        }
        const validPassword = await UserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: newUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end;
    }
});


module.exports = router
