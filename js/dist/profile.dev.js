"use strict";

//get data from localstorage
var get_user = localStorage.getItem("username");
var get_email = localStorage.getItem("email");
var products = JSON.parse(localStorage.getItem("products")) || productsDB;
var myProducts = products.filter(function (i) {
  return i.isMe === "yes";
}); //variables

var userDom2 = document.getElementById("username");
var userEmailDom = document.getElementById("email");
var productsLength = document.querySelector("#productsLength span");
var productsdiv = document.querySelector("#productsLength");
userDom2.innerHTML = get_user;
userEmailDom.innerHTML = get_email;

if (myProducts.length != 0) {
  productsLength.innerHTML = myProducts.length;
} else {
  productsdiv.remove();
}