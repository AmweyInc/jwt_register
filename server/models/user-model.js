const {Schema,model} = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({         // пробовал менять на mongoose.schema
    email:{type:String, unique:true,required:true},
    password:{type:String,required:true},
    isActivated:{type:Boolean,default:false},
    ActivationLink:{type:String,required:true}
})

module.exports = model('User',UserSchema); // пробовал менять на mongoose.model
