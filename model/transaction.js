const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    address:String,
   transaction_details:{},
    createdAT : { type: Date,default:Date.now()}
})

module.exports=mongoose.model('transaction',transactionSchema)