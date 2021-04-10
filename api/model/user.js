var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    isadmin: Boolean
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');