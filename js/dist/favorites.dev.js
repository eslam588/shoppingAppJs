"use strict";

var productDom = document.querySelector(".products");
var noProductsDom = document.querySelector(".noproducts");

function drawFavoritesProductsUI() {
  var allProducts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0) {
    noProductsDom.innerHTML = "<P>There is no items</P>";
  }

  var products = JSON.parse(localStorage.getItem('productsFavorite')) || allProducts;
  var ProductsUI = products.map(function (item) {
    return "\n               <div class=\"product-item\">\n                    <img src=".concat(item.imageUrl, " class=\"product-item-image\" alt=\"image\" width=\"200px\">\n                    <div class=\"product-item-desc\">\n                        <h2>").concat(item.title, "</h2>\n                        <p>").concat(item.desc, "</p>\n                        <span>size : ").concat(item.size, "</span><br>\n                        <span>Quantity: ").concat(item.qty, "<span>\n                    </div>\n                    <div class=\"product-item-actions\">\n                        <button class=\"add-to-cart\" onClick=\"removeItemFromCart(").concat(item.id, ")\" >Remove From Favorite</button>    \n                    </div>\n                </div>");
  });
  productDom.innerHTML = ProductsUI.join("");
}

drawFavoritesProductsUI();

function removeItemFromCart(id) {
  var productsFavorite = localStorage.getItem('productsFavorite');

  if (productsFavorite) {
    var items = JSON.parse(productsFavorite);
    var filteredItems = items.filter(function (item) {
      return item.id !== id;
    });
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
    drawFavoritesProductsUI(filteredItems);
  }
}