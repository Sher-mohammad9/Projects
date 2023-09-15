const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountHolderName : {
        type : String,
        required : true
    },

    mobileNumber : {
        type : Number,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    accountNumber :{
        type : Number,
    },
    
    pin : {
        type : Number
    },

    balance :{
        type : Number,
        defualt : 0
    },

    statement : {
        type : Object,
        default : []
    }
})

module.exports = mongoose.model("sbiBank", accountSchema, "sbiBank");