const router = require('express').Router();

const apiRoutes = require('./API');
const homePageRoutes = require('../homepage-routes.js');

router.use('/API', apiRoutes);
router.use('/', homePageRoutes);

module.exports = router 
