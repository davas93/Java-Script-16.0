"use strict";

function DomElement(selector, height, width, bg, fontSize, color) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.color = color;
}

DomElement.prototype.createElement = function () {
  if (this.selector.startsWith(".")) {
    const div = document.createElement("div");

    div.classList.add("block");
    div.style.cssText = `width: ${this.width}; height: ${this.height};  background-color: ${this.bg}; font-size: ${this.fontSize}; color: ${this.color}`;
    document.body.appendChild(div);
    div.innerHTML = "Здорова, я div с классом .block";
  } else if (this.selector.startsWith("#")) {
    const p = document.createElement("p");

    p.setAttribute("id", "best");
    p.style.cssText = `width: ${this.width}; height: ${this.height};  background-color: ${this.bg}; font-size: ${this.fontSize}; color: ${this.color}`;
    document.body.appendChild(p);
    p.innerHTML = "Салютики, а я лучший абзац т.к мой id #best!";
  }
};

const element = new DomElement(
  ".block",
  "200px",
  "300px",
  "blue",
  "20px",
  "white"
);
console.log(element);

element.createElement();
