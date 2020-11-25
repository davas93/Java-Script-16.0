let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "Сторонние заказы",
  addExpenses = prompt("Перечислите возможные расходы через запятую?"),
  deposit = confirm("Есть ли у Вас депозит в банке"),
  mission = 200000,
  period = 5;

let start = function () {
  money = prompt("Ваш месячный доход?");

  while (!isNumber(money)) {
    money = prompt("Ваш месячный доход?");
  }
};

start();

let showTypeOf = function (item) {
  console.log(typeof item);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(","));

let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов");
    sum += +prompt("Во сколко это обойдется");
  }
  console.log(expenses);
  return sum;
};

let expensesAmonth = getExpensesMonth();

console.log("Расходы за месяц: " + expensesAmonth);

let getAccumulatedMonth = function () {
  return money - expensesAmonth;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
  return mission / accumulatedMonth;
};

let budgetDay = accumulatedMonth / 30;

console.log(
  "Цель будет достигнута за " + Math.ceil(getTargetMonth()) + " месяцев(-а)"
);

let getStatusIncome = function () {
  if (budgetDay <= 0) {
    return "Что-то пошло не так";
  } else if (budgetDay < 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (budgetDay <= 1200) {
    return "У вас средний уровень дохода";
  } else {
    return "У вас высокий уровень дохода";
  }
};

console.log(getStatusIncome());
