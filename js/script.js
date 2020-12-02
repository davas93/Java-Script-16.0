"use strict";

const book = document.querySelectorAll(".book");
const books = document.querySelector(".books");
const body = document.querySelector("body");

//Переставляем книги
books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

//Меняем фон
body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

console.log(body);
