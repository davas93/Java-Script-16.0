"use strict";

const book = document.querySelectorAll(".book");
const books = document.querySelector(".books");
const body = document.querySelector("body");
const titleBook3 = book[4].querySelector("a");
const adv = document.querySelector(".adv");
const items = books.querySelectorAll("li");

//Переставляем книги
books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

//Меняем фон
body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

//Исправляем заголовок
titleBook3.textContent = "Книга 3. this и Прототипы Объектов";

//Удаляем рекламу
adv.remove();

//Порядок глав
items[3].after(items[6]);
items[6].after(items[8]);
items[9].after(items[2]);
items[48].before(items[50]);
items[50].before(items[49]);
items[49].before(items[55]);
items[53].after(items[51]);

//Добавляем главу
items[25].insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>");
