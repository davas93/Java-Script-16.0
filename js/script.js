"use strict";

let calculateBtn = document.getElementById("start"),
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
  incomeAmountInput = document.querySelector(".income-amount"),
  expensesNameInput = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesInput = document.querySelector(".additional_expenses-item"),
  targetAmountInput = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodNum = document.querySelector(".period-amount");

console.log(
  calculateBtn,
  incomeAddBtn,
  expensesAddBtn,
  depositCheck,
  incomeInputs,
  budgetDayValue,
  expensesMonthValue,
  additionalIncomeValue,
  additionalExpensesValue,
  incomePeriodValue,
  targetMonthValue,
  budgetMonthValue,
  incomeMonthInput,
  incomeNameInput,
  incomeAmountInput,
  expensesNameInput,
  additionalExpensesInput,
  targetAmountInput,
  periodSelect,
  periodNum
);

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isString = function (n) {
    return !isNaN(!parseFloat(n)) && isFinite(n);
  };

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  period: 5,
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    let target = appData.mission / appData.budgetMonth;
    if (target < 0) {
      return "Цель не будет достигнута";
    } else {
      return "Цель будет достигнута за " + Math.ceil(target) + " месяцев(-а)";
    }
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
  start: function () {
    if (incomeMonthInput.value === "") {
      alert("Ошибка: Поле должно быть заполнено!");
      return;
    }

    appData.budget = incomeMonthInput.value;
    console.log("incomeMonthInput.value: ", incomeMonthInput.value);

    appData.getExpenses();

    appData.getExpensesMonth();
    appData.getBudget();
    appData.getTargetMonth();
    appData.getStatusIncome();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
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
  asking: function () {
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      let itemIncome;
      do {
        itemIncome = prompt(
          "Какой у вас дополнительный заработок?",
          "Cторонние проекты"
        );
      } while (!!isString(itemIncome));
      let cashIncome;
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?");
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt("Перечислите возможные расходы через запятую?");
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у Вас депозит в банке");
    appData.getInfoDeposit();
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.persentDeposit = prompt("Какой годовой процент?");
      } while (!isNumber(this.persentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена");
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

let getUpperCase = function () {};

calculateBtn.addEventListener("click", appData.start);
expensesAddBtn.addEventListener("click", appData.addExpensesBlock);

console.log(
  appData.addExpenses.join(", ").replace(/(^|\s)\S/g, function (a) {
    return a.toUpperCase();
  })
);
console.log(appData.getTargetMonth());

for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные: " + key + " " + appData[key]
  );
}

/* console.log(
  appData.persentDeposit,
  appData.moneyDeposit,
  appData.calcSavedMoney()
);
 */
