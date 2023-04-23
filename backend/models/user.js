const config = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



//User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('user', userSchema);

module.exports.addUser = function(newUser, callback){console.log(newUser.password); // try this 
  bcrypt.genSalt(10, (err, salt) => {
    console.log("=======",newUser.password)
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      
      newUser.save(callback);
    });
  });
}
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByemail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch);
  });
}
