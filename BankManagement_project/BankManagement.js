"use strict";

let accounts = [];
if (localStorage.getItem("accounts")) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
} else {
  accounts = [];
}
class openAccount {
  constructor(name, mobile, address, permission, accountNumber, pin) {
    this.name = name;
    this.mobile = mobile;
    this.address = address;
    this.permission = permission;
    this.accountNumber = accountNumber;
    this.pin = pin;
    this.balance = 100;
    this.statement = [];
  }

  open() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const name = form["name"].value;
    if (!name) {
      document.getElementById("checkName").innerHTML = "Enter name";
      return false;
    }
    document.getElementById("checkName").innerHTML = null;

    const mobile = form["mobile"].value;
    const regexMo = /^[789][0-9]{9}$/;
    if (!mobile) {
      document.getElementById("checkmobile").innerHTML = "Enter mobile";
      return false;
    }
    if (!regexMo.test(mobile)) {
      document.getElementById("checkmobile").innerHTML =
        "Sorry only indian allowed";
      return false;
    }
    document.getElementById("checkmobile").innerHTML = null;

    const address = form["address"].value;
    if (!address) {
      document.getElementById("checkaddress").innerHTML = "Enter address";
      return false;
    }
    document.getElementById("checkaddress").innerHTML = null;

    let userAccountNumber = "";
    for (let i = 1; i <= 6; i++) {
      userAccountNumber += Math.trunc(Math.random() * 9);
    }

    let userPin = "";
    for (let i = 1; i <= 4; i++) {
      userPin += Math.trunc(Math.random() * 9);
    }
    alert(`Hello ${name} your account number ${userAccountNumber}`);
    alert(`Hello ${name} your pin number ${userPin}`);
    alert(`Congratulaon your account is open`);
    const account = new openAccount(
      name,
      mobile,
      address,
      true,
      userAccountNumber,
      userPin
    );
    console.log(account);
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    this.formClear(forms);
  }

  deposit() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter account number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const pin = form["pin"].value;
    if (!pin) {
      document.getElementById("checkpin").innerHTML = "Enter pin";
      return false;
    }
    if (pin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;

    let amount = form["amount"].value;
    amount = Number(amount)
    if (!amount) {
      document.getElementById("checkamount").innerHTML = "Enter amount";
      return false;
    }
    if (amount <= 0) {
      document.getElementById("checkmount").innerHTML =
        "Enter amount gerther then 0";
    }
    document.getElementById("checkamount").innerHTML = null;
    if (amount) {
      accountData.balance += amount;
      accountData.statement.push(amount);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Sucessfully deposit money");
    }
    this.formClear(forms);
  }

  withdraw() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter account number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const pin = form["pin"].value;
    if (!pin) {
      document.getElementById("checkpin").innerHTML = "Enter pin";
      return false;
    }
    if (pin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;

    let amount = form["amount"].value;
    amount = Number(amount);
    console.log(amount, typeof amount, accountData.balance);
    if (!amount) {
      document.getElementById("checkamount").innerHTML = "Enter amount";
      return false;
    }
    if (amount < 0 || amount > accountData.balance) {
      document.getElementById(
        "checkamount"
      ).innerHTML = `Sory your current balance is ${accountData.balance}`;
      return false;
    }
    document.getElementById("checkamount").innerHTML = null;
    if (amount) {
      accountData.balance -= amount;
      accountData.statement.push(-amount);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Sucessfully withdraw money");
    }
    this.formClear(forms);
  }

  transfer() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter A/C number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const pin = form["pin"].value;
    if (!pin) {
      document.getElementById("checkpin").innerHTML = "Enter pin";
      return false;
    }
    if (pin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;

    const otherAcNumber = form["OtheraccountNumber"].value;
    if (!otherAcNumber) {
      document.getElementById("checkOtheraccountNumber").innerHTML =
        "Enter A/C number";
      return false;
    }

    const otherAccountData = accounts.filter(
      (account) => account.accountNumber === otherAcNumber
    );
    if(otherAccountData[0]){
    if (otherAccountData[0].accountNumber !== otherAcNumber) {
      document.getElementById("checkOtheraccountNumber").innerHTML =
        "Wrong A/C number";
      return false;
    }
  }else{
      document.getElementById("checkOtheraccountNumber").innerHTML =
        "Wrong A/C number";
        return false;
    }

    document.getElementById("checkOtheraccountNumber").innerHTML = null;

    let amount = form["amount"].value;
    amount = Number(amount);
    if (!amount) {
      document.getElementById("checkamount").innerHTML = "Enter amount";
      return false;
    }
    if (amount < 0 || amount > accountData.balance) {
      document.getElementById(
        "checkmount"
      ).innerHTML = `Sory your current balance is ${accountData.balance}`;
    }
    document.getElementById("checkamount").innerHTML = null;
    if (amount) {
      accountData.balance -= amount;
      accountData.statement.push(-amount);
      otherAccountData.balance += amount;
      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Sucessfully Transfer money");
    }
    this.formClear(forms);
  }

  checkBalance() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter A/C number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const pin = form["pin"].value;
    if (!pin) {
      document.getElementById("checkpin").innerHTML = "Enter pin";
      return false;
    }
    if (pin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;
    document.getElementById("balance").innerHTML = `${accountData.balance} Rs`;
    this.formClear(forms);
  }

  printStatement() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter A/C number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const pin = form["pin"].value;
    if (!pin) {
      document.getElementById("checkpin").innerHTML = "Enter pin";
      return false;
    }
    if (pin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;
    const deposit = [];
    const withdraw = [];
    for (let val of accountData.statement) {
      if (val > 0) {
        deposit.push(val);
      } else {
        withdraw.push(val);
      }
    }
    document.getElementById(
      "statement"
    ).innerHTML = `Hello ${accountData.name} and your account number ${accountData.accountNumber} in
  SBI bank, your current balance is ${accountData.balance} Rs,<br> 
  Your Transcation :<br>
  Deposit ${deposit}<br>
  Withdraw ${withdraw}<br>`;
    this.formClear(forms);
  }

  changePin() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter A/C number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const currentpin = form["pin"].value;
    if (!currentpin) {
      document.getElementById("checkpin").innerHTML = "Enter current pin";
      return false;
    }
    if (currentpin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;

    const newpin = form["newpin"].value;
    if (!newpin) {
      document.getElementById("checknewpin").innerHTML = "Enter new pin";
      return false;
    }
    document.getElementById("checknewpin").innerHTML = null;
    const confirmpin = form["confirmpin"].value;
    if (!confirmpin) {
      document.getElementById("checkconfirmpin").innerHTML =
        "Enter confirm pin";
      return false;
    }
    if (confirmpin !== newpin) {
      document.getElementById("checkconfirmpin").innerHTML =
        "Confirm pin is not same";
      return false;
    } else {
      accountData.pin = newpin;
      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Sucessfully change pin");
    }
    this.formClear(forms);
  }

  closeAccount() {
    const forms = document.getElementById("myForm");
    const form = document.forms["accountData"];
    const accountNumber = form["accountNumber"].value;
    if (!accountNumber) {
      document.getElementById("checkaccountNumber").innerHTML =
        "Enter A/C number";
      return false;
    }
    const accountData = this.accountList(accountNumber);
    if (!accountData) {
      return false;
    }
    document.getElementById("checkaccountNumber").innerHTML = null;

    const pin = form["pin"].value;
    if (!pin) {
      document.getElementById("checkpin").innerHTML = "Enter pin";
      return false;
    }
    if (pin !== accountData.pin) {
      document.getElementById("checkpin").innerHTML = "Wrong pin";
      return false;
    }
    document.getElementById("checkpin").innerHTML = null;
    accountData.permission = false;
    alert("Sucessfully close account");
    localStorage.clear();
    accounts = [];
    this.formClear(forms);
  }

  accountList(acNumber) {
    const filteredAccount = accounts.filter(
      (account) => account.accountNumber === acNumber
    );
    if (filteredAccount[0]) {
      if (filteredAccount && filteredAccount.length === 1) {
        return filteredAccount[0];
      } else {
        document.getElementById("checkaccountNumber").innerHTML =
          "Two accounts same number";
      }
    } else {
      document.getElementById("checkaccountNumber").innerHTML =
        "Wrong A/C number";
    }
  }

  formClear(form) {
    function manageFn(event) {
      event.preventDefualt();
    }
    form.reset();
    form.addEventListener("submit", manageFn);
  }
}

const accountHolder = new openAccount();
