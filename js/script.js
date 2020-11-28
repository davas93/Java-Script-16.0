"use strict";

let money,
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = +prompt("Ваш месячный доход?");
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
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  /*getTargetMonth: function () {
    let target = appData.mission / appData.budgetMonth;
    if (target < 0) {
      console.log("Цель не будет достигнута");
    } else {
      console.log(
        "Цель будет достигнута за " + Math.ceil(target) + " месяцев(-а)"
      );
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
  },*/

  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы через запятую?");
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у Вас депозит в банке");
    for (let i = 0; i < 2; i++) {
      let currentExpenseName = prompt("Введите обязательную статью расходов");

      let expenseValue;
      do {
        expenseValue = prompt("Во сколко это обойдется?");
      } while (!isNumber(expenseValue));
      appData.expenses[currentExpenseName] = parseFloat(expenseValue);
    }
    console.log(appData.expenses);
  },
};
appData.asking();
console.log(typeof appData.budgetDay);
appData.getExpensesMonth();
appData.getBudget();
console.log(appData);
