"use strict";

let money,
  expenses = [],
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 200000,
  period: 5,
  getExpensesMonth: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt("Введите обязательную статью расходов");

      let checkNumber;

      do {
        checkNumber = prompt("Во сколко это обойдется?");
      } while (!isNumber(checkNumber));
      sum += +checkNumber;
    }
    return sum;
  },
  getAccumulatedMonth: function () {
    return money - expensesAmonth;
  },
  getTargetMonth: function () {
    let target = appData.mission / accumulatedMonth;
    if (target < 0) {
      console.log("Цель не будет достигнута");
    } else {
      console.log(
        "Цель будет достигнута за " + Math.ceil(target) + " месяцев(-а)"
      );
    }
  },
  getStatusIncome: function () {
    if (budgetDay <= 0) {
      return "Что-то пошло не так";
    } else if (budgetDay < 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (budgetDay <= 1200) {
      return "У вас средний уровень дохода";
    } else {
      return "У вас высокий уровень дохода";
    }
  },

  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы через запятую?");
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у Вас депозит в банке");
  },
};

let expensesAmonth = appData.getExpensesMonth();

console.log("Расходы за месяц: " + expensesAmonth);

let accumulatedMonth = appData.getAccumulatedMonth();

appData.getTargetMonth();

let budgetDay = accumulatedMonth / 30;

console.log(appData.getStatusIncome());
