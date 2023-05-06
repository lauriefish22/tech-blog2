const router = require('express').Router;
const User = require('../../models/user.js');


router.get('/:id', async (req, res) => {
    try {
        const newUserData = await User.create({

            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
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
        if (!newUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' });
            return;
        }
        const validPassword = await newUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


