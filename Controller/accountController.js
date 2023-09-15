const jwt = require("jsonwebtoken");
const config = require("../config.js")
const accountModel = require("../database/model/accountModel.js");


const accountOpen = async (req, resp)=>{
    const userDetails = req.body;
    try{
    const user = await accountModel.create(userDetails);
     jwt.sign({user}, config.secretKey, {expiresIn : "12h"}, (err, token)=>{
          if(err){
              resp.status(403).send({Error : err});
          }else{
            resp.json({
                token,
            })
          }
     })
    } catch(error){
        resp.send(user)
    }
}

const userProfile = async (req, resp)=>{
    try{
        const userDetails = JSON.parse(req.params.details)
        const data = await accountModel.findOne(userDetails);
        resp.status(200).send({
            data,
        })
    }catch(err){
        resp.status(500).send({status : false, message : "User not found", Error : err.message});
    }
}


const depositMoney = async (req, resp)=>{
    try{
        const updateValue = req.body
        const currentData = await accountModel.findOne({accountNumber : updateValue.accountNumber, pin : updateValue.pin});
        console.log(currentData.balance)
        if(!currentData){
            resp.status(404).send({status:404, message : "Data incorrect"})
            return;
        }
        const accountDeta = await accountModel.findOneAndUpdate({accountNumber : updateValue.accountNumber}, {$set : {balance :  currentData.balance + req.body.balance,}, $push: { statement: req.body.balance }}) 
        resp.status(200).send({status:200, message : "Sucessfully deposit money"})
    }catch(error){
        resp.status(500).send({status:500, message : "Internal Server Error"});
    }
}


const withdrowMoney = async (req, resp)=>{
    try{
        const updateValue = req.body
        const currentData = await accountModel.findOne({accountNumber : updateValue.accountNumber, pin : updateValue.pin});
        if(!currentData){
            resp.status(404).send({status:404, message : "Data incorrect"})
            return;
        }else if(currentData.balance <= req.body.balance){
            resp.status(404).send({status:404, message : `Sorry your current Balance is ${currentData.balance}`});
            return;
        }
        const accountDeta = await accountModel.findOneAndUpdate({accountNumber : updateValue.accountNumber}, {$set : {balance :  currentData.balance - req.body.balance}, $push: { statement: -req.body.balance }}) 
        resp.status(200).send({status:200, message : "Sucessfully deposit money"})
    }catch(error){
        resp.status(500).send({status:500, message : "Internal Server Error"});
    }
}


const transferMoney = async(req, resp)=>{
    try{
        const accountDetails = req.body;
        const otherAccount = await accountModel.findOne({accountNumber : accountDetails.otherAcNumber});
        if(otherAccount){
            const mainAccount = await accountModel.findOne({accountNumber : accountDetails.accountNumber, pin : accountDetails.pin});
          if(mainAccount){
            if(mainAccount.balance >= accountDetails.balance){
            await accountModel.findOneAndUpdate({accountNumber : accountDetails.accountNumber, pin : accountDetails.pin}, {$set : {balance :  mainAccount.balance - accountDetails.balance}, $push: { statement: -req.body.balance }});
            await accountModel.findOneAndUpdate({accountNumber : accountDetails.otherAcNumber}, {$set : {balance :  otherAccount.balance + accountDetails.balance}});
            resp.status(200).send({status : 200, message : "SuccessFully transfer money"})
            }else{
                resp.status(404).send({status : 404, message : `Sorry your current balance is ${mainAccount.balance}`});
            return;
            }
        }else{
            resp.status(404).send({status : 404, message : "Main Account Not Found"});
            return;
          }
        }else{
            resp.status(404).send({status : 404, message : "Other Account Not Found"});
            return;
        }
    }catch(err){
        resp.status(500).send({status : 500, message : "Internal server error"});
    }
}


const checkBalance = async (req, resp)=>{
    try{
        const accountDetails = JSON.parse(req.params.details);
        console.log(accountDetails)
        const accountData = await accountModel.findOne(accountDetails);
        if(accountData){
            resp.status(200).send({status : 200, accountData,});
        }else{
            resp.status(404).send({status : 404, message : "Data Not Found"});
        }
    }catch(err){
        resp.status(500).send({status : 500, message : "Internal server error"});
    }
}


const accountStatement = async (req, resp)=>{
    try{
        const accountDetails = JSON.parse(req.params.details);
        const accountData = await accountModel.findOne(accountDetails);
        if(accountData){
            resp.status(200).send({status : 200, accountData,});
        }else{
            resp.status(404).send({status : 404, message : "Data Not Found"});
        }
    }catch(err){
        resp.status(500).send({status : 500, message : "Internal server error"})
    }
}

const checkPin = async (req, resp)=>{
    try{
        const accountDetails = req.body;
       const accountData = await accountModel.findOneAndUpdate({accountNumber : accountDetails.accountNumber, pin : accountDetails.currentpin}, {$set : {pin : accountDetails.newpin}});
       resp.status(200).send({status : 200, message : "Successfully change pin"});
    }catch(err){
        resp.status(500).send({status : 500, message : "Internal server error"});
    }
}

const closeAcount = async (req, resp)=>{
    try{
        console.log(req.body);
        const accountData = await accountModel.findOneAndRemove(req.body);
        console.log(accountData)
        resp.status(200).send({status : 200, message : "Account successfully delete"});
    }catch(err){
        resp.status(500).send({status : 500, message : "Internal server error"});
    }
}


module.exports = {
    accountOpen,
    userProfile,
    depositMoney,
    withdrowMoney,
    transferMoney,
    checkBalance,
    accountStatement,
    checkPin,
    closeAcount,
}