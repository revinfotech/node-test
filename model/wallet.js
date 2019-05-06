const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    address:String,
    balance:String,
    createdAT : { type: Date,default:Date.now()}
})

module.exports=mongoose.model('wallet',userSchema)