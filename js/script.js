"use strict";

let money = prompt("Ваш месячный доход?"),
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
  budgetMonth = money - (amonth1 + amonth2),
  budgetDay = budgetMonth / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(", "));
console.log("Бюджет на месяц: ", budgetMonth + " ");
console.log(
  "Цель будет достигнута за ",
  Math.ceil(mission / budgetMonth) + " ",
  " месяцев(-а)"
);
console.log("Бюджет на день: ", Math.floor(budgetDay) + " ");

if (budgetDay > 1200) {
  console.log("У Вас высокий уровень дохода");
} else if (budgetDay <= 1200 && budgetDay > 600) {
  console.log("У Вас средний уровень дохода");
} else if (budgetDay > 0 && budgetDay <= 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay <= 0) {
  console.log("Что то пошло не так");
}
