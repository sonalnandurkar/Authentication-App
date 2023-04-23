const express = require('express');

const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


//Register
router.post('/signup', (req, res, next)=> {
  let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
     
  });
  console.log("----------------",req.body.password)
  User.addUser(newUser,(err) => {
      if(err){
          res.json({success: false, msg:'Failed to register user'});
      } else {
          res.json({success: true, msg:'User registerd'});
      }

  });

});

//login
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByemail(email, (err, user) => {
      if(err) throw err;
      console.log("useeeeeeeer",user);
      if(user){
          return res.json({success: true, msg: "User  found", user});
          
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
              const token = jwt.sign(payload, config.secret, {
                  expiresIn: 604800 //1 week
              });
              res.json({
                  suces: true,
                  token: 'jwt '+token,
                  user: {
                      id: user._id,
                      name: user.name,
                      email: user.email
                  }
              });
          }else {
              return res.json({success: false, msg: "wrong password"});
          }
      });
  });
});

module.exports = router;
