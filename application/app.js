const express = require("express");
const cors = require("cors");
require("../database/db-config.js");
const bankRouter = require("../router/bankRouter.js");

const app = express();

app.use(express.json());
app.use(cors());

app.route("/").get((req, resp)=>{
    resp.status(200).send("Welcome to sbi bank")
});

app.use("/api/v1/sbibank", bankRouter);

module.exports = app;