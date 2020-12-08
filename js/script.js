"use strict";

let calculateBtn = document.getElementById("start"),
  resetBtn = document.querySelector("#cancel"),
  incomeAddBtn = document.getElementsByTagName("button")[0],
  expensesAddBtn = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  incomeInputs = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  budgetMonthValue = document.querySelector(".budget_month-value"),
  incomeMonthInput = document.querySelector(".salary-amount"),
  incomeNameInput = document.querySelector(".income-title"),
  expensesNameInput = document.querySelector(".expenses-title"),
  incomeItems = document.querySelectorAll(".income-items"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesInput = document.querySelector(".additional_expenses-item"),
  targetAmountInput = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodNum = document.querySelector(".period-amount"),
  incomeItem = document.querySelectorAll(".income-items");

calculateBtn.setAttribute("disabled", "true");
calculateBtn.style.opacity = "0.5";

//Деактивация кнопки
let checkInput = function (e) {
  if (incomeMonthInput.value !== "") {
    calculateBtn.removeAttribute("disabled");
    calculateBtn.style.opacity = "1";
  } else {
    calculateBtn.setAttribute("disabled", "true");
    calculateBtn.style.opacity = "0.5";
  }
};
incomeMonthInput.addEventListener("keyup", checkInput);

//Запреты на ввод

/* let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isString = function (n) {
    return !isNaN(!parseFloat(n)) && isFinite(n);
  }; */

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  start: function () {
    if (incomeMonthInput.value !== "") {
      let inputs = document.querySelectorAll("[type=text]");
      resetBtn.style = "display: block";
      calculateBtn.style = "display: none";
      expensesAddBtn.setAttribute("disabled", "disabled");
      incomeAddBtn.setAttribute("disabled", "disabled");
      inputs.forEach(function (item) {
        item.setAttribute("disabled", "disabled");
      });

      this.budget = +incomeMonthInput.value;
      this.getIncome();
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getIncomeMonth();
      this.getTargetMonth();
      this.getStatusIncome();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
    }
  },
  reset: function () {
    let incomeItems = document.querySelectorAll(".income-items"),
      expensesItems = document.querySelectorAll(".expenses-items"),
      inputs = document.querySelectorAll("[type=text]");

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    this.mission = 1;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];

    periodSelect.value = 1;
    periodNum.textContent = periodSelect.value;
    targetMonthValue.value = 0;

    incomeItems.forEach(function (item, i) {
      if (i !== 0) {
        item.remove();
      }
    });

    expensesItems.forEach(function (item, i) {
      if (i !== 0) {
        item.remove();
      }
    });

    resetBtn.style.display = "none";
    calculateBtn.style.display = "block";
    expensesAddBtn.style.display = "block";
    incomeAddBtn.style.display = "block";
    expensesAddBtn.removeAttribute("disabled", "disabled");
    incomeAddBtn.removeAttribute("disabled", "disabled");

    inputs.forEach(function (item) {
      item.value = "";
      item.removeAttribute("disabled", "disabled");
    });

    calculateBtn.setAttribute("disabled", "true");
    calculateBtn.style.opacity = "0.5";
  },
  inputNumDisable: function () {
    let inputsSum = document.querySelectorAll("[placeholder = 'Сумма']");
    inputsSum.forEach(function (item) {
      item.oninput = (e) =>
        (e.target.value = e.target.value.replace(/\D/g, ""));
    });
  },
  inputOnlyRus: function () {
    let inputsName = document.querySelectorAll(
      "[placeholder = 'Наименование']"
    );
    inputsName.forEach(function (item) {
      item.oninput = (e) =>
        (e.target.value = e.target.value.replace(/[^а-я^,^ ]/g, ""));
    });
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener("input", function () {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
    console.log(this.budgetMonth);
  },
  getTargetMonth: function () {
    return targetAmountInput.value / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay <= 0) {
      return "Что-то пошло не так";
    } else if (appData.budgetDay < 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay <= 1200) {
      return "У вас средний уровень дохода";
    } else {
      return "У вас высокий уровень дохода";
    }
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    expensesItems = document.querySelectorAll(".expenses-items");

    if (expensesItems.length === 3) {
      expensesAddBtn.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value,
        cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    incomeItems = document.querySelectorAll(".income-items");

    if (incomeItems.length === 3) {
      incomeAddBtn.style.display = "none";
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncomes = item.querySelector(".income-title").value,
        cashIncomes = item.querySelector(".income-amount").value;
      if (itemIncomes !== "" && cashIncomes !== "") {
        appData.income[itemIncomes] = +cashIncomes;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesInput.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    incomeInputs.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getPeriod: function (e) {
    periodNum.textContent = e.target.value;
  },
  /*  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.persentDeposit = prompt("Какой годовой процент?");
      } while (!isNumber(this.persentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена");
      } while (!isNumber(this.moneyDeposit));
    }
  }, */
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

appData.inputNumDisable();
appData.inputOnlyRus();
calculateBtn.addEventListener("click", appData.start.bind(appData));
expensesAddBtn.addEventListener(
  "click",
  appData.addExpensesBlock.bind(appData)
);
incomeAddBtn.addEventListener("click", appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener("input", appData.getPeriod.bind(appData));
resetBtn.addEventListener("click", appData.reset.bind(appData));

/* console.log(
  appData.addExpenses.join(", ").replace(/(^|\s)\S/g, function (a) {
    return a.toUpperCase();
  })
);
console.log(appData.getTargetMonth()); */

/* for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные: " + key + " " + appData[key]
  );
} */

/* console.log(
  appData.persentDeposit,
  appData.moneyDeposit,
  appData.calcSavedMoney()
);
 */
