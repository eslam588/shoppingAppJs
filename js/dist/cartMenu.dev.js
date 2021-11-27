"use strict";

//check if there is items in localstorage
var cartProductDivDom = document.querySelector(".carts-products div");
var badgeDom = document.querySelector(".badge");
var shoppingCartIcon = document.querySelector(".shoppingCart");
var cartProductMenu = document.querySelector(".carts-products");
shoppingCartIcon.addEventListener("click", openCartMenu);
var addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];

if (addedItem) {
  addedItem.map(function (item) {
    cartProductDivDom.innerHTML += "<p>".concat(item.title, " ").concat(item.qty, "</p>");
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML += addedItem.length;
} // open cart menu


function openCartMenu() {
  if (cartProductDivDom.innerHTML != "") {
    if (cartProductMenu.style.display == "block") {
      cartProductMenu.style.display = "none";
    } else {
      cartProductMenu.style.display = "block";
    }
  }
}