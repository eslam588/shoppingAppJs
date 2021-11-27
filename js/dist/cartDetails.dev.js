"use strict";

var products = JSON.parse(localStorage.getItem('products'));
var productId = localStorage.getItem("productId");
var itemDom = document.querySelector(".item-details");
var productDetails = products.find(function (item) {
  return item.id == productId;
});
itemDom.innerHTML = "\n                     <img src=\"".concat(productDetails.imageUrl, "\" alt=\"\" />\n                     <h2>").concat(productDetails.title, "</h2>\n                     <p>").concat(productDetails.desc, "</p>\n                     <span> Size :").concat(productDetails.size, "</span><br>\n                     <span> Quantity :").concat(productDetails.qty, "</span>\n                     <button onclick=\"editProduct(").concat(productId, ")\">Edit Product</button>"); //Edit product 

function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}