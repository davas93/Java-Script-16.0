"use strict";

class First {
  hello() {
    console.log("Привет, я метод родителя!");
  }
}

class Second extends First {
  hello() {
    return super.hello() + console.log("А я наследуемый метод");
  }
}

const first = new First();
const second = new Second();
second.hello();
