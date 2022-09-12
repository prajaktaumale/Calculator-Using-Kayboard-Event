const num = document.getElementsByClassName("num");
const operate = document.getElementsByClassName("operator");
const storedVariable = document.querySelectorAll(".storedVariable");

function getHistorty() {
  return document.getElementById("history-value").innerText;
}

function displayHistory(num) {
  document.getElementById("history-value").innerText = num;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function displayOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else if (num == "-" && getOutput() == "") {
    document.getElementById("output-value").innerText = num;
  } else {
    answer = document.getElementById("output-value");
    answer.innerText = format(num);
  }
}

function format(num) {
  if (num == "") return "";
  value = Number(num);
  val = value.toLocaleString("en-US");
  return val;
}

function formatReverse(num) {
  return Number(num.replace(/,/g, ""));
}

//Function to Display number in Output
function showNumber(e) {
  output = getOutput();
  if (output == "-") {
    output = Number(this.id) - 2 * Number(this.id);
    displayOutput(output);
  } else {
    output = formatReverse(getOutput());
    if (output != NaN) {
      output = output + this.id;
    }

    displayOutput(output);
  }
}
function getOperator(e) {
  if (this.id == "AC") {
    displayOutput("");
    displayHistory("");
  } else if (this.id == "Ce") {
    output = formatReverse(getOutput()).toString();

    if (output) {
      output = output.substr(0, output.length - 1);
      if (output == "-") {
        output = "";
      }
      displayOutput(output);
    }
  } else if (this.id == "-" && getOutput() == "") {
    output = this.id;
    displayOutput(output);
  } else if (output === "-") {
    return;
  } else {
    output = getOutput();
    his = getHistorty();

    if (output == "" && his != "") {
      if (isNaN(his[-1])) {
        his = his.substr(0, his.length - 1);
      }
    }
    if (output != "" || his != "") {
      output = output == "" ? output : formatReverse(output);
      his = his + output;

      if (this.id == "=") {
        res = eval(his);
        displayOutput(res);
        displayHistory("");
      } else {
        his = his + this.id;
        displayOutput("");
        displayHistory(his);
      }
    }
  }
}
for (i = 0; i < operate.length; ++i) {
  operate[i].addEventListener("click", function (e) {
    getOperator.call(this);
  });
}

for (i = 0; i < num.length; ++i) {
  num[i].addEventListener("click", function () {
    showNumber.call(this);
  });
}
//add Event Listener to Listen to keypress events---------------------------------------------------
document.body.addEventListener("keydown", function (e) {
  if (isFinite(e.key)) {
    showNumber.call(num[e.key === "0" ? 9 : Number(e.key) - 1]);
  } else if (e.key === "Backspace") getOperator.call(operate[0]);
  else if (e.key === "Escape") getOperator.call(operate[1]);
  else if (e.key === "%") getOperator.call(operate[2]);
  else if (e.key === "/") getOperator.call(operate[3]);
  else if (e.key === "*") getOperator.call(operate[4]);
  else if (e.key === "+") getOperator.call(operate[5]);
  else if (e.key === "-") getOperator.call(operate[6]);
  else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    getOperator.call(operate[7]);
  } else if (
    e.key === "Alt" ||
    e.key == "Shift" ||
    e.key === "Control" ||
    e.key === "Tab" ||
    e.key === "F5"
  )
    return;
  else alert("Only Numbers are Allowed");
});

//Adding M+, M-, MRC, MC functionality---------------------------------------------------------------

function addingToMemory() {
  if (getOutput()) {
    output = getOutput();
    output = formatReverse(output);
    if (!localStorage.storedNumber) {
      localStorage.storedNumber = `${output}`;
    } else {
      localStorage.storedNumber = `
    ${Number(localStorage.storedNumber) + output}`;
    }
  }
}
function subtractFromMemory() {
  if (getOutput()) {
    output = getOutput();
    output = formatReverse(output);
    if (!localStorage.storedNumber) {
      localStorage.storedNumber = `${output}`;
    } else {
      localStorage.storedNumber = `
    ${Number(localStorage.storedNumber) - output}`;
    }
  }
}
function clearFromMemory() {
  localStorage.removeItem("storedNumber");
}
function showFromMemory() {
  if (localStorage.storedNumber) {
    output = localStorage.storedNumber;
    displayOutput(output);
  }
}
for (i = 0; i < storedVariable.length; ++i) {
  storedVariable[i].addEventListener("click", function () {
    if (this.id === "m+") {
      addingToMemory();
    }
    if (this.id === "m-") {
      subtractFromMemory();
    }
    if (this.id === "mc") {
      clearFromMemory();
    }
    if (this.id === "mrc") {
      showFromMemory();
    }
  });
}
