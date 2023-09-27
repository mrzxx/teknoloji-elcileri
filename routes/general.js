const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');
const perm = require('../middleware/perm');

//router.get('/register',userController.register_endpoint);
router.get('/test',perm('3'),generalController.test);
router.get('/test',perm('2'),generalController.testDeleteUser);
router.get('/test',perm('1'),generalController.testApproveUser);
//router.post('/register',authController.post_register);
module.exports = router;
