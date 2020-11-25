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
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
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

    let checkNumber;

    do {
      checkNumber = prompt("Во сколко это обойдется?");
    } while (!isNumber(checkNumber));
    sum += +checkNumber;
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
  let target = mission / accumulatedMonth;
  if (target < 0) {
    console.log("Цель не будет достигнута");
  } else {
    console.log(
      "Цель будет достигнута за " + Math.ceil(target) + " месяцев(-а)"
    );
  }
};
getTargetMonth();

let budgetDay = accumulatedMonth / 30;

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
