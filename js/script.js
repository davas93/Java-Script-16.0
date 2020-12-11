'use strict';

const calculateBtn = document.getElementById('start'),
	resetBtn = document.querySelector('#cancel'),
	incomeAddBtn = document.getElementsByTagName('button')[0],
	expensesAddBtn = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
	incomeInputs = document.querySelectorAll('.additional_income-item'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	expensesMonthValue = document.getElementsByClassName(
		'expenses_month-value'
	)[0],
	additionalIncomeValue = document.getElementsByClassName(
		'additional_income-value'
	)[0],
	additionalExpensesValue = document.getElementsByClassName(
		'additional_expenses-value'
	)[0],
	incomePeriodValue = document.getElementsByClassName(
		'income_period-value'
	)[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	budgetMonthValue = document.querySelector('.budget_month-value'),
	incomeMonthInput = document.querySelector('.salary-amount'),
	incomeNameInput = document.querySelector('.income-title'),
	expensesNameInput = document.querySelector('.expenses-title'),
	additionalExpensesInput = document.querySelector(
		'.additional_expenses-item'
	),
	targetAmountInput = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodNum = document.querySelector('.period-amount'),
	incomeItem = document.querySelectorAll('.income-items'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
	expensesItems = document.querySelectorAll('.expenses-items');

calculateBtn.setAttribute('disabled', 'true');
calculateBtn.style.opacity = '0.5';

//Деактивация кнопки
const checkInput = (e) => {
	if (incomeMonthInput.value !== '') {
		calculateBtn.removeAttribute('disabled');
		calculateBtn.style.opacity = '1';
	} else {
		calculateBtn.setAttribute('disabled', 'true');
		calculateBtn.style.opacity = '0.5';
	}
};
incomeMonthInput.addEventListener('keyup', checkInput);

/* let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isString = function (n) {
    return !isNaN(!parseFloat(n)) && isFinite(n);
  }; */

class AppData {
	constructor() {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.persentDeposit = 0;
		this.moneyDeposit = 0;
	}

	start() {
		if (incomeMonthInput.value !== '') {
			const inputs = document.querySelectorAll('[type=text]');
			resetBtn.style = 'display: block';
			calculateBtn.style = 'display: none';
			expensesAddBtn.setAttribute('disabled', 'disabled');
			incomeAddBtn.setAttribute('disabled', 'disabled');
			inputs.forEach((item) => {
				item.setAttribute('disabled', 'disabled');
			});

			this.budget = +incomeMonthInput.value;
			this.getExpInc();
			this.getTargetMonth();
			this.getStatusIncome();
			this.getAddExpenses();
			this.getAddIncome();
			this.getInfoDeposit();
			this.getBudget();
			this.showResult();
		}
	}

	reset() {
		const incomeItems = document.querySelectorAll('.income-items'),
			expensesItems = document.querySelectorAll('.expenses-items'),
			inputs = document.querySelectorAll('[type=text]');

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

		incomeItems.forEach((item, i) => {
			if (i !== 0) {
				item.remove();
			}
		});

		expensesItems.forEach((item, i) => {
			if (i !== 0) {
				item.remove();
			}
		});

		resetBtn.style.display = 'none';
		calculateBtn.style.display = 'block';
		expensesAddBtn.style.display = 'block';
		incomeAddBtn.style.display = 'block';
		expensesAddBtn.removeAttribute('disabled', 'disabled');
		incomeAddBtn.removeAttribute('disabled', 'disabled');

		inputs.forEach((item) => {
			item.value = '';
			item.removeAttribute('disabled', 'disabled');
		});

		calculateBtn.setAttribute('disabled', 'true');
		calculateBtn.style.opacity = '0.5';

		depositBank.style.display = 'none';
		depositAmount.style.display = 'none';
		depositPercent.style.display = 'none';
		depositBank.value = '';
		depositAmount.value = '';
		depositPercent.value = '';
		depositCheck.checked = false;
		depositPercent.style.color = '#353a43';
		depositPercent.style.borderColor = '#ff7f63';
	}

	inputNumDisable() {
		const inputsSum = document.querySelectorAll("[placeholder = 'Сумма']");
		inputsSum.forEach((item) => {
			item.oninput = (e) =>
				(e.target.value = e.target.value.replace(/\D/g, ''));
		});
	}

	inputOnlyRus() {
		const inputsName = document.querySelectorAll(
			"[placeholder = 'Наименование']"
		);
		inputsName.forEach((item) => {
			item.oninput = (e) =>
				(e.target.value = e.target.value.replace(/[^а-я^,^ ]/g, ''));
		});
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = Math.floor(this.budgetDay);
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcSavedMoney();
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = this.calcSavedMoney();
		});
	}

	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
		this.budgetMonth =
			this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = this.budgetMonth / 30;
	}

	getTargetMonth() {
		return targetAmountInput.value / this.budgetMonth;
	}

	getStatusIncome() {
		if (this.budgetDay <= 0) {
			return 'Что-то пошло не так';
		} else if (this.budgetDay < 600) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else if (this.budgetDay <= 1200) {
			return 'У вас средний уровень дохода';
		} else {
			return 'У вас высокий уровень дохода';
		}
	}

	addExpensesBlock() {
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		cloneExpensesItem.querySelector('.expenses-title').value = '';
		cloneExpensesItem.querySelector('.expenses-amount').value = '';
		expensesItems[0].parentNode.insertBefore(
			cloneExpensesItem,
			expensesAddBtn
		);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesAddBtn.style.display = 'none';
		}
	}

	addIncomeBlock() {
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		cloneIncomeItem.querySelector('.income-title').value = '';
		cloneIncomeItem.querySelector('.income-amount').value = '';
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			incomeAddBtn.style.display = 'none';
		}
	}

	addExpIncBlocks() {}

	getExpInc() {
		const count = (item) => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = +itemAmount;
			}
		};

		incomeItems.forEach(count);
		expensesItems.forEach(count);

		for (let key in this.income) {
			this.incomeMonth += this.income[key];
		}

		for (let key in this.expenses) {
			this.expensesMonth += this.expenses[key];
		}
	}

	getAddExpenses() {
		const addExpenses = additionalExpensesInput.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}

	getAddIncome() {
		incomeInputs.forEach((item) => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	}

	getPeriod(e) {
		periodNum.textContent = e.target.value;
	}

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	}

	getInfoDeposit() {
		if (this.deposit) {
			this.persentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}

	changePercent() {
		const valueSelect = this.value;
		if (valueSelect === 'other') {
			depositPercent.value = '';
			depositPercent.style.display = 'inline-block';
		} else {
			depositPercent.style.display = 'none';
			depositPercent.value = valueSelect;
		}
	}

	incorrectInput() {
		if (depositPercent.value >= 0 && depositPercent.value <= 100) {
			calculateBtn.disabled = false;
			calculateBtn.style.opacity = '1';
		} else {
			calculateBtn.disabled = true;
			calculateBtn.style.opacity = '0.5';
			alert('Введите корректное значение в поле "Проценты"');
			depositPercent.value = '';
		}
	}

	depositHandler() {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
			depositPercent.addEventListener('input', this.incorrectInput);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
			depositPercent.removeEventListener('input', this.incorrectInput);
			depositPercent.style.display = 'none';
			depositPercent.style.borderColor = '#ff7f63';
		}
	}

	eventListeners() {
		calculateBtn.addEventListener('click', this.start.bind(this));
		expensesAddBtn.addEventListener(
			'click',
			this.addExpensesBlock.bind(this)
		);
		incomeAddBtn.addEventListener('click', this.addIncomeBlock.bind(this));
		periodSelect.addEventListener('input', this.getPeriod.bind(this));
		resetBtn.addEventListener('click', this.reset.bind(this));

		depositCheck.addEventListener('change', this.depositHandler.bind(this));
	}
}
const appData = new AppData();
console.log(appData);
appData.eventListeners();
appData.inputNumDisable();
appData.inputOnlyRus();

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
