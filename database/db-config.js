const mongoose = require("mongoose");
const config = require("../config.js");
mongoose.connect(config.mongodb, {UseNewUrlParser : true})
.then(()=>{
    console.log("Connection successfully");
}).catch((error)=>{
    console.log(error.message);
})