const router = require('express').Router();

const apiRoutes = require('./API');
const homePageRoutes = require('./homepage-routes.js');
const postPageRoutes = require('./post-page-routes.js');

router.use('/API', apiRoutes);
router.use('/', homePageRoutes);
router.use('/postPageRoutes', postPageRoutes);

module.exports = router 
