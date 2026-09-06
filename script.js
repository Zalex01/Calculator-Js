//Variables
let total = 0;
let is_Error = false;
let id_limit;
let number_elem = [];
let oper_elem = [];
let show_text = "0";
let new_number = "";
let numbers = [];
let operators = [];
let opers = [".", "+", "-", "*", "/", "=", "C", "<"]

//Objects
let display = document.getElementById("display");

//Functions
function Update(Error) {
  if (Error) {
    display.textContent = "Error";
  }
  else if (number_elem.length <= 0) {
    show_text = "0";
    display.textContent = show_text;
  }
  else {
    show_text = "";
    for (let showing = 0; showing < number_elem.length; showing++) {
      show_text += number_elem[showing];
      if (showing <= oper_elem.length - 1) {
        show_text += " " + oper_elem[showing] + " ";
      }
    }
    display.textContent = show_text;
  }
}

//Logic
for (let btns = 0; btns < 10; btns++) {
  numbers[btns] = document.getElementById("btn" + String(btns));
}

for (let oper = 0; oper < opers.length; oper++) {
  operators[oper] = document.getElementById("btn" + opers[oper])
}

for (let btn_number of numbers) {
  btn_number.addEventListener("click", function() {
    if (oper_elem.length !== number_elem.length) {
      number_elem[number_elem.length - 1] += btn_number.textContent;
    }
    else {
      number_elem.push(btn_number.textContent);
    }
    Update(false)
  });
}

for (let btn_oper = 0; btn_oper < opers.length; btn_oper++) {
  operators[btn_oper].addEventListener("click", function () {
    if (opers[btn_oper] === "=") {
      if (oper_elem.length > 0) {
        if (oper_elem.length < number_elem.length) {
          id_limit = oper_elem.length;
        }
        else {
          id_limit = oper_elem.length - 1;
        }
        total = Number(number_elem[0]);
        for (let id_oper = 0; id_oper < id_limit; id_oper++) {
          if (oper_elem[id_oper] === "+") {
            total += Number(number_elem[id_oper + 1]);
          }
          if (oper_elem[id_oper] === "-") {
            total -= Number(number_elem[id_oper + 1]);
          }
          if (oper_elem[id_oper] === "*") {
            total *= Number(number_elem[id_oper + 1]);
          }
          if (oper_elem[id_oper] === "/") {
            if (number_elem[id_oper + 1] != 0) {
              total /= Number(number_elem[id_oper + 1]);
            }
            else {
              total = 0;
              is_Error = true;
              break;
            }
          }
        }
        total = Number(total.toFixed(10))
        if (total !== 0) {
          number_elem = [String(total)];
          oper_elem = [];
        }
        else {
          number_elem = [];
          oper_elem = [];
        }
      }
    }
    else if (opers[btn_oper] === "C") {
      number_elem = [];
      oper_elem = [];
    }
    else if (opers[btn_oper] === "<") {
      if (number_elem.length === oper_elem.length) {
        oper_elem.pop();
      }
      else {
        if (number_elem[number_elem.length - 1].length > 1) {
          number_elem[number_elem.length - 1] = number_elem[number_elem.length - 1].slice(0, -1);
        }
        else if (number_elem.length === 1) {
          number_elem = [];
        }
        else {
          number_elem.pop()
        }
      }
    }
    else if (opers[btn_oper] === "." && number_elem.length > 0) {
      if ((!number_elem[number_elem.length - 1].includes(".")) && oper_elem.length < number_elem.length) {
        number_elem[number_elem.length - 1] += opers[btn_oper];
      }
    }
    else {
      if (number_elem.length > oper_elem.length) {
        oper_elem.push(opers[btn_oper]);
      }
      else {
        oper_elem[oper_elem.length - 1] = opers[btn_oper];
      }
    }
    Update(is_Error)
    is_Error = false;
  });
}

Update(false);