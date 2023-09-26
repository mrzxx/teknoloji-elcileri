const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');

//router.get('/register',userController.register_endpoint);
router.get('/test',generalController.test);
//router.post('/register',authController.post_register);
module.exports = router;
