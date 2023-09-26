const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login/student',authController.login_as_a_student);

router.post('/register/student',authController.register_endpoint_for_users);
router.post('/register/company',authController.register_endpoint_for_users);
router.post('/register/instructor',authController.register_endpoint_for_users);

//router.post('/register',authController.post_register);
module.exports = router;
