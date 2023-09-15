const express = require("express");
const accountControll = require("../Controller/accountController.js")
const userAuthentication = require("../middleware/userAuthentication.js");
const bankRouter = express.Router();

bankRouter.route("/account/open").post(accountControll.accountOpen);
bankRouter.route("/account/deposit").put(userAuthentication, accountControll.depositMoney);
bankRouter.route("/account/withdrow").put(userAuthentication, accountControll.withdrowMoney);
bankRouter.route("/account/transfer").put(userAuthentication, accountControll.transferMoney);
bankRouter.route("/account/changepin").put(userAuthentication, accountControll.checkPin);
bankRouter.route("/account/close").delete(userAuthentication, accountControll.closeAcount);



bankRouter.route("/account/:details").get(userAuthentication, accountControll.userProfile);
bankRouter.route("/account/balance/:details").get(userAuthentication, accountControll.checkBalance);
bankRouter.route("/account/statement/:details").get(userAuthentication, accountControll.accountStatement);

module.exports = bankRouter;