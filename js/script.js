"use strict";

let money = +prompt("Ваш месячный доход?"),
  income = "Сторонние проекты",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 200000,
  period = 5,
  expenses1 = prompt("Введите обязательную статью расходов?"),
  amonth1 = +prompt("Во сколько это обойдется?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  amonth2 = +prompt("Во сколько это обойдется?"),
  accumulatedMonth = getAccumulatedMonth(),
  budgetDay = accumulatedMonth / 30,
  showTypeOf = function (data) {
    return typeof data;
  },
  getStatusIncome = function () {
    if (budgetDay > 1200) {
      return "У Вас высокий уровень дохода";
    } else if (budgetDay <= 1200 && budgetDay > 600) {
      return "У Вас средний уровень дохода";
    } else if (budgetDay > 0 && budgetDay <= 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (budgetDay <= 0) {
      return "Что то пошло не так";
    }
  };

function getExpensesMonth() {
  return amonth1 + amonth2;
}

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

function getTargetMonth() {
  return mission / accumulatedMonth;
}

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log("Расходы за месяц: " + getExpensesMonth());
console.log(addExpenses.split(", "));
console.log("Cрок достижения цели в месяцах: " + Math.ceil(getTargetMonth()));
console.log("Бюджет на день: ", Math.floor(budgetDay) + " ");
console.log(getStatusIncome());
