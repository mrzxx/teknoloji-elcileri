const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');


router.post('/login/student',authController.login_as_a_student);
router.post('/login/company',authController.login_as_a_company);
router.post('/login/instructor',authController.login_as_a_ins);
router.post('/logout',authController.logout);

router.post('/register/student',authController.login_as_a_student);
router.post('/register/company',authController.login_as_a_company);
router.post('/register/instructor',authController.login_as_a_ins);

//router.post('/register',authController.post_register);
module.exports = router;
