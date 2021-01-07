const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    phone: String,
    groupid: Number,
});
userSchema.methods.comparePassword = function (password) {
    var user = this;
    if ( password == user.password )
    {
        return true;
    } else {
        return false;
    }
};
var User=mongoose.model("User",userSchema,"users");
module.exports=User;