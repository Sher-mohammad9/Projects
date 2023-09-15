"use strict";

let accounts = [];
const openAccount = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountHolderName = form["name"].value;
  if (!accountHolderName) {
    document.getElementById("checkName").innerHTML = "Enter name";
    return false;
  }
  document.getElementById("checkName").innerHTML = "";

  const mobileNumber = form["mobile"].value;
  const regexMo = /^[789][0-9]{9}$/;
  if (!mobileNumber) {
    document.getElementById("checkmobile").innerHTML = "Enter mobile";
    return false;
  }
  if (!regexMo.test(mobileNumber)) {
    document.getElementById("checkmobile").innerHTML =
      "Sorry only indian allowed";
    return false;
  }
  document.getElementById("checkmobile").innerHTML = "";

  const address = form["address"].value;
  if (!address) {
    document.getElementById("checkaddress").innerHTML = "Enter address";
    return false;
  }
  document.getElementById("checkaddress").innerHTML = "";

  const balance = 0;

  let accountNumber = "";
  for (let i = 1; i <= 6; i++) {
    accountNumber += Math.trunc(Math.random() * 9) + 1;
  }

  let pin = "";
  for (let i = 1; i <= 4; i++) {
    pin += Math.trunc(Math.random() * 9) + 1;
  }
  alert(`Hello ${accountHolderName} your account number ${accountNumber}`);
  alert(`Hello ${accountHolderName} your pin number ${pin}`);
  alert(`Congratulaon your account is open`);

  let responseData = await fetch(
    "http://localhost:8080/api/v1/sbibank/account/open",
    {
      method: "post",
      body: JSON.stringify({
        accountHolderName,
        mobileNumber,
        address,
        balance,
        accountNumber,
        pin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  responseData = await responseData.json();
  console.log(responseData);
  accounts.push(responseData);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  formClear(forms);
};

const userProfile = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountHolderName = form["name"].value;
  if (!accountHolderName) {
    document.getElementById("checkName").innerHTML = "Enter name";
    return false;
  }
  document.getElementById("checkName").innerHTML = "";

  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkAccountNumber").innerHTML =
      "Enter account number";
    return false;
  }
  document.getElementById("checkAccountNumber").innerHTML = "";
  const queryObj = JSON.stringify({ accountHolderName, accountNumber });

  const token = JSON.parse(localStorage.getItem("accounts"))[0];

  let data = await fetch(
    `http://localhost:8080/api/v1/sbibank/account/${queryObj}`,
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
      },
    }
  );
  data = await data.json();
  const table = document.getElementById("userData");
  Object.entries(data.data).forEach((userData)=>{
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td")
    let thNode = document.createTextNode(userData[0]);
    let tdNode = document.createTextNode(userData[1]);
    th.appendChild(thNode);
    td.appendChild(tdNode);
    th.appendChild(td)
    tr.appendChild(th);
    table.appendChild(tr)
  })
  console.log(data);
  formClear(forms);
};

const deposit = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter account number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const pin = form["pin"].value;
  if (!pin) {
    document.getElementById("checkpin").innerHTML = "Enter pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  let amount = form["amount"].value;
  amount = Number(amount);
  if (!amount) {
    document.getElementById("checkamount").innerHTML = "Enter amount";
    return false;
  }

  if (amount <= 0) {
    document.getElementById("checkmount").innerHTML =
      "Enter amount gerther then 0";
    return false;
  }
  document.getElementById("checkamount").innerHTML = "";

  if (amount) {
    let balance = amount;
    const token = JSON.parse(localStorage.getItem("accounts"))[0].token;

    handleRequestBody(
      { accountNumber, pin, balance },
      "http://localhost:8080/api/v1/sbibank/account/deposit",
      "put",
      token
    );
  }
  formClear(forms);
};

const withdraw = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter account number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const pin = form["pin"].value;
  if (!pin) {
    document.getElementById("checkpin").innerHTML = "Enter pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  let amount = form["amount"].value;
  amount = Number(amount);
  if (!amount) {
    document.getElementById("checkamount").innerHTML = "Enter amount";
    return false;
  }
  if (amount < 0) {
    document.getElementById("checkamount").innerHTML = `Enter amount > 0 `;
    return false;
  }
  document.getElementById("checkamount").innerHTML = "";
  if (amount) {
    const balance = amount;
    const token = JSON.parse(localStorage.getItem("accounts"))[0].token;

    handleRequestBody(
      { accountNumber, pin, balance },
      "http://localhost:8080/api/v1/sbibank/account/withdrow",
      "put",
      token
    );
  }
  formClear(forms);
};

const transfer = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter A/C number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const pin = form["pin"].value;
  if (!pin) {
    document.getElementById("checkpin").innerHTML = "Enter pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  const otherAcNumber = form["OtheraccountNumber"].value;
  if (!otherAcNumber) {
    document.getElementById("checkOtheraccountNumber").innerHTML =
      "Enter A/C number";
    return false;
  }
  document.getElementById("checkOtheraccountNumber").innerHTML = "";

  let amount = form["amount"].value;
  amount = Number(amount);
  if (!amount) {
    document.getElementById("checkamount").innerHTML = "Enter amount";
    return false;
  }
  document.getElementById("checkamount").innerHTML = "";

  if (amount) {
    const balance = amount;
    const token = JSON.parse(localStorage.getItem("accounts"))[0].token;

    handleRequestBody(
      { accountNumber, pin, otherAcNumber, balance },
      "http://localhost:8080/api/v1/sbibank/account/transfer",
      "put",
      token
    );
  }
  formClear(forms);
};

const checkBalance = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter A/C number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const pin = form["pin"].value;
  if (!pin) {
    document.getElementById("checkpin").innerHTML = "Enter pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  const token = JSON.parse(localStorage.getItem("accounts"))[0].token;
  const params = JSON.stringify({ accountNumber, pin });

  handleRequestParams(
    false,
    `http://localhost:8080/api/v1/sbibank/account/balance/${params}`,
    "Get",
    token
  );
  formClear(forms);
};

const printStatement = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter A/C number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const pin = form["pin"].value;
  if (!pin) {
    document.getElementById("checkpin").innerHTML = "Enter pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  const token = JSON.parse(localStorage.getItem("accounts"))[0].token;
  const params = JSON.stringify({ accountNumber, pin });

  handleRequestParams(
    true,
    `http://localhost:8080/api/v1/sbibank/account/statement/${params}`,
    "Get",
    token
  );

  formClear(forms);
};

const changePin = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter A/C number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const currentpin = form["pin"].value;
  if (!currentpin) {
    document.getElementById("checkpin").innerHTML = "Enter current pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  const newpin = form["newpin"].value;
  if (!newpin) {
    document.getElementById("checknewpin").innerHTML = "Enter new pin";
    return false;
  }
  document.getElementById("checknewpin").innerHTML = "";

  const confirmpin = form["confirmpin"].value;
  if (!confirmpin) {
    document.getElementById("checkconfirmpin").innerHTML = "Enter confirm pin";
    return false;
  }
  document.getElementById("checkconfirmpin").innerHTML = "";

  if (confirmpin !== newpin) {
    document.getElementById("checkconfirmpin").innerHTML =
      "Confirmpin is not match newpin";
    return false;
  }
  document.getElementById("checkconfirmpin").innerHTML = "";

  const token = JSON.parse(localStorage.getItem("accounts"))[0].token;

  handleRequestBody(
    { accountNumber, currentpin, newpin },
    `http://localhost:8080/api/v1/sbibank/account/changepin`,
    "put",
    token
  );

  formClear(forms);
};

const closeAccount = async () => {
  const forms = document.getElementById("myForm");
  const form = document.forms["accountData"];
  const accountNumber = form["accountNumber"].value;
  if (!accountNumber) {
    document.getElementById("checkaccountNumber").innerHTML =
      "Enter A/C number";
    return false;
  }
  document.getElementById("checkaccountNumber").innerHTML = "";

  const pin = form["pin"].value;
  if (!pin) {
    document.getElementById("checkpin").innerHTML = "Enter pin";
    return false;
  }
  document.getElementById("checkpin").innerHTML = "";

  const token = JSON.parse(localStorage.getItem("accounts"))[0].token;

  handleRequestBody(
    { accountNumber, pin },
    "http://localhost:8080/api/v1/sbibank/account/close",
    "delete",
    token
  );

  formClear(forms);
};

const handleRequestBody = async (userData, url, httpMethod, token) => {
  let responseData = await fetch(url, {
    method: httpMethod,
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  responseData = await responseData.json();
  console.log(responseData);
  if (responseData.status === 200) {
    alert(responseData.message);
  } else if (responseData.status === 500) {
    alert(responseData.message);
  } else if (responseData.status === 403) {
    alert(responseData.Token);
  } else if (responseData.status === 401) {
    alert(responseData.Error);
  } else if (responseData.status === 404) {
    alert(responseData.message);
  }
};

const handleRequestParams = async (flag, url, httpMethod, token) => {
  let responseData = await fetch(url, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  responseData = await responseData.json();
  console.log(responseData);
  if (responseData.status === 200) {
    if (flag) {
      const statementDeposit = [];
      const statementWithdraw = [];
      for (let amount of responseData.accountData.statement) {
        amount < 0
          ? statementWithdraw.push(amount)
          : statementDeposit.push(amount);
      }
      document.getElementById(
        "statement"
      ).innerHTML = `Hello ${responseData.accountData.accountHolderName} and your account number ${responseData.accountData.accountNumber} in
    SBI bank, your current balance is ${responseData.accountData.balance} Rs,<br> 
    Your Transcation :<br>
    Deposit ${statementDeposit}<br>
    Withdraw ${statementWithdraw}<br>`;
    } else {
      document.getElementById("balance").innerHTML =
        responseData.accountData.balance + " Rs.";
    }
  } else if (responseData.status === 500) {
    alert(responseData.message);
  } else if (responseData.status === 403) {
    alert(responseData.Token);
  } else if (responseData.status === 401) {
    alert(responseData.Error);
  } else if (responseData.status === 404) {
    alert(responseData.message);
  }
};

const formClear = (form) => {
  function manageFn(event) {
    event.preventDefualt();
  }
  form.reset();
  form.addEventListener("submit", manageFn);
};
