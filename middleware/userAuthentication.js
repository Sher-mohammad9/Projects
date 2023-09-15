const jwt = require("jsonwebtoken");
const webSocket = require("ws");
const bcrypt =  require("bcrypt");
const config = require("../config.js")
const accountModel = require("../database/model/accountModel.js");

const userAuthentication = async (req, resp, next)=>{
    const token = req.headers["authorization"];
    if(token){
    jwt.verify(token, config.secretKey, (err, authData)=>{
        if(err){
            resp.status(401).send({status : 401, Error : err.message, Token : "Not verify token"})
        }else{
           req.token = token;
           next();
        }
    })
}else{
    resp.status(403).send({Status : 403, Error : "token invalid"});
}
}

module.exports = userAuthentication;


