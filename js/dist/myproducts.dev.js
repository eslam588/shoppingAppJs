"use strict";

var productDom = document.querySelector(".products");
var noProductsDom = document.querySelector(".noproducts");
var drawProductsUI;
(drawProductsUI = function drawProductsUI() {
  var products = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var myProducts = products.filter(function (item) {
    return item.isMe === "yes";
  });
  console.log("myproducts", myProducts);

  if (myProducts.length != 0) {
    console.log("yes");
    var ProductsUI = myProducts.map(function (item) {
      return "\n                   <div class=\"product-item\" style= \"border: ".concat(item.isMe === 'yes' ? "2px solid green" : "", "\">\n                        <img src=").concat(item.imageUrl, " class=\"product-item-image\" alt=\"image\" width=\"200px\">\n                        <div class=\"product-item-desc\">\n                            <a onclick=\"saveItemData(").concat(item.id, ")\">").concat(item.title, "</a>\n                            <p>").concat(item.desc, "</p>\n                            <span>size : ").concat(item.size, "</span>\n                             <button class ='edit-product' onclick ='editProduct(").concat(item.id, ")'>Edit Product</button>\n\n                              <br>\n\n                             <button class ='edit-product' onclick ='deleteProduct(").concat(item.id, ")'>Delete Product</button>\n                        </div>\n                    </div>");
    });
    productDom.innerHTML = ProductsUI.join("");
  } else {
    console.log("no");
    noProductsDom.innerHTML = "No Products !!";
  }
})(JSON.parse(localStorage.getItem("products")) || productsDB); //Edit product 

function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
} //delete product


function deleteProduct(id) {
  var products = JSON.parse(localStorage.getItem("products")) || productsDB;
  var myProducts = products.filter(function (item) {
    return item.isMe === "yes";
  });
  var filtered = myProducts.filter(function (i) {
    return i.id !== id;
  });
  var clickedItem = myProducts.find(function (i) {
    return i.id === id;
  });
  products = products.filter(function (i) {
    return i.id !== clickedItem.id;
  });
  localStorage.setItem("products", JSON.stringify(products));
  drawProductsUI(filtered);
}