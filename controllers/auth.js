const User = require('../models/users');
const Company = require('../models/company');
const Instructor = require('../models/instructor');

const Roles = require('../models/roles');
const Permissions = require('../models/permissions');
const UserHasPermissions = require('../models/user_has_permissions');
const RoleHasPermissions = require('../models/role_has_permissions');

const bcrypt = require('bcrypt');

exports.register_endpoint_for_users = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const create = new User({
      name: req.body.name,
      surname: req.body.surname,
      userType: 'users',
      email: req.body.email,
      phoneNumber: req.body.phone,
      password: hashedPassword,
      studentId:req.body.studentId,
      facultyId:req.body.facultyId,
      departmentId:req.body.departmentId,
      classId: req.body.classId
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const create = new User({
      tax_no: req.body.tax_no,
      company_title: req.body.company_title,
      userType: 'company',
      company_person: req.body.company_person,
      company_sector: req.body.company_sector,
      password: hashedPassword,
      email:req.body.email,
      phoneNumber:req.body.phoneNumber
    });
    // Veriyi kaydet
    const result = await create.save();
    res.json(result);
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
        req.session.userType = 'users';
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

exports.login_as_a_company = async (req,res,next) => {
  try {
    const password = req.body.password;
    if (!password) {
      res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const login = await Company.findOne({ where: { email: req.body.email } });
    if(login){
      let compare = await bcrypt.compare(req.body.password,login.password);
      if(compare){
        req.session.userID = login.id;
        req.session.userType = 'company';
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

exports.login_as_a_ins = async (req,res,next) => {
  try {
    const password = req.body.password;
    if (!password) {
      res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const login = await Instructor.findOne({ where: { email: req.body.email } });
    if(login){
      let compare = await bcrypt.compare(req.body.password,login.password);
      if(compare){
        req.session.userID = login.id;
        req.session.userType = 'instructor';
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

exports.logout = async (req,res,next) => {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Oturum sonlandırma hatası' });
      }
      res.clearCookie('connect.sid'); // Tarayıcıdaki çerezi geçersiz kıl
      res.status(200).json({ message: 'Oturum başarıyla sonlandırıldı' });
    });
  } catch (error) {
    next(error);
  }
}