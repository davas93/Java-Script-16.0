"use strict";

let money,
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isString = function (n) {
    return !isNaN(!parseFloat(n)) && isFinite(n);
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
    for (let i = 0; i < 2; i++) {
      let currentExpenseName;
      do {
        currentExpenseName = prompt("Введите обязательную статью расходов");
      } while (!!isString(currentExpenseName));
      let expenseValue;
      do {
        expenseValue = prompt("Во сколко это обойдется?");
      } while (!isNumber(expenseValue));
      appData.expenses[currentExpenseName] = parseFloat(expenseValue);
    }
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
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
console.log("Расходы за месяц: " + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные: " + key + " " + appData[key]
  );
}

appData.getInfoDeposit();
console.log(
  appData.persentDeposit,
  appData.moneyDeposit,
  appData.calcSavedMoney()
);
