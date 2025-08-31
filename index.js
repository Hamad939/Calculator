let expression = "";
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const clearAll = document.getElementById("clearAll");
let numberBtn = document.querySelectorAll("[data-num]");
let operatorBtn = document.querySelectorAll("[data-ope]");
let justCalculated = false;
let lastBtnOpe = false;
function updatedisplay(value) {
  document.getElementById("display").textContent = value;
}
//loop for number clicked/
numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (justCalculated === true && lastBtnOpe === false) {
      ``;
      expression = "";
      justCalculated = false;
    }
    expression += btn.dataset.num;
    updatedisplay(expression);
  });
});
//loop for operator clicked//
operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let lastChar = expression.slice(-1);
    let ope = btn.dataset.ope;

    if (expression == "" && ope !== "√") {
      return;
    }
    if (lastChar === "√") {
      expression = expression.slice(0, -1) + ope;
    } else if (ope === "√") {
      expression += ope;
    } else if (!isNaN(lastChar)) {
      expression += ope;
    } else {
      expression = expression.slice(0, -1) + ope;
    }
    updatedisplay(expression);
    lastBtnOpe = true;
  });
});
equal.addEventListener("click", () => {
  /*break down string("123+23-23") into separate(tokens) strings("123""+""23""-""23") using regular expression
  to convert string("123") to number(123) */
  let token = expression.match(/\d+(\.\d+)?|[+\-x/%√]/g);
  for (let i = 0; i < token.length; i++) {
    if (!isNaN(token[i])) {
      token[i] = parseFloat(token[i]);
    }
  }

  for (let i = 0; i < token.length; i++) {
    if (token[i] === "%" || token[i] === "√") {
      let result =
        token[i] === "%" ? token[i - 1] / 100 : Math.sqrt(token[i + 1]);
      if (token[i] === "%") {
        token.splice(i - 1, 2, result);
        i--;
      } else {
        token.splice(i, 2, result);
        i--;
      }
    }
  }
  for (let i = 0; i < token.length; i++) {
    if (token[i] === "x" || token[i] === "/") {
      let result =
        token[i] === "x"
          ? token[i - 1] * token[i + 1]
          : token[i + 1] === 0
          ? "Error"
          : token[i - 1] / token[i + 1];
      token.splice(i - 1, 3, result);
      i--;
    }
  }
  for (let i = 0; i < token.length; i++) {
    if (token[i] === "+" || token[i] === "-") {
      let result =
        token[i] === "+"
          ? token[i - 1] + token[i + 1]
          : token[i - 1] - token[i + 1];
      token.splice(i - 1, 3, result);
      i--;
    }
  }
  updatedisplay(token[0]);
  expression = token[0].toString();
  justCalculated = true;
  lastBtnOpe = false;
});
clearAll.addEventListener("click", () => {
  expression = "";
  updatedisplay(expression || 0);
  justCalculated = false;
  lastBtnOpe = false;
});
clear.addEventListener("click", () => {
  expression = expression.slice(0, -1);
  updatedisplay(expression);
});
