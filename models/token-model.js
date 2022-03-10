const {Schema,model} = require("mongoose");
const mongoose = require("mongoose");

const TokenSchema = new Schema({
    userLink:{type:Schema.Types.ObjectId,ref:'User'},
    refreshToken:{type:String,required:true}
});

module.exports = model('Token',TokenSchema);