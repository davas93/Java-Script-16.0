"use strict";

let money = 40000,
  income = "Сторонние проекты",
  addExpenses = "Продукты, Интернет, Кварплата",
  deposit = true,
  mission = 200000,
  period = 5,
  budgetDay = 40000 / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(", "));
console.log(budgetDay);
