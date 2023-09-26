const User = require('../models/users');
const Company = require('../models/company');
const Instructor = require('../models/instructor');
const bcrypt = require('bcrypt');

exports.register_endpoint_for_users = async (req, res, next) => {
  try {
    const create = new User({
      name: 'Mert2',
      surname: 'Pamuk',
      userType: 1,
      email: 'mertpamuk0101@gmail.com',
      phoneNumber: '05537344950',
      password: 'mert123',
      child:{
        class:1
      }
    });
    
    // Veriyi kaydet
    const result = await create.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.register_endpoint_for_company = async (req, res, next) => {
  try {
    res.json({message:'Not ready yet.'});
  } catch (error) {
    next(error);
  }
};


exports.register_endpoint_for_instructors = async (req, res, next) => {
  try {
    res.json({message:'Not ready yet.'});
  } catch (error) {
    next(error);
  }
};


exports.login_as_a_student = async (req,res,next) => {
  try {
    const password = req.body.password;
    if (!password) {
      res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const login = await User.findOne({ where: { email: req.body.email } });
    if(login){
      let compare = await bcrypt.compare(req.body.password,login.password);
      if(compare){
        req.session.userID = login.id;
        req.session.table = 'users';
        await req.session.save();
        res.status(200).json({message:req.sessionID,loginid:login.id});
      }else{
        res.status(404).json({message:"Wrong Password & Email"});
      }
    }else{
      res.status(404).json({message:"Wrong Password & Email"});
    }
  } catch (error) {
    next(error);
  }
}