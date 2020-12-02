"use strict";

const book = document.querySelectorAll(".book");
const books = document.querySelector(".books");

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

console.log(book);
