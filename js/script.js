"use strict";

const book = document.querySelectorAll(".book");
const books = document.querySelector(".books");
const body = document.querySelector("body");
const titleBook3 = book[4].querySelector("a");

//Переставляем книги
books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

//Меняем фон
body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

//Исправляем заголовок
titleBook3.textContent = "Книга 3. this и Прототипы Объектов";

console.log(titleBook3);
