var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  password: String,
  isadmin:Boolean
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');