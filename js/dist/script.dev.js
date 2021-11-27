"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//define products
var productsDom = document.querySelector(".products");
var products = productsDB; // display products

var drawProductsUI;
(drawProductsUI = function drawProductsUI() {
  var products = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var ProductsUI = products.map(function (item) {
    return "\n               <div class=\"product-item\" style= \"border: ".concat(item.isMe === 'yes' ? "2px solid green" : "", "\">\n                    <img src=").concat(item.imageUrl, " class=\"product-item-image\" alt=\"image\" width=\"200px\">\n                    <div class=\"product-item-desc\">\n                        <a onclick=\"saveItemData(").concat(item.id, ")\">").concat(item.title, "</a>\n                        <p>").concat(item.desc, "</p>\n                        <span>size : ").concat(item.size, "</span>\n                        ").concat(item.isMe === "yes" && "<button class ='edit-product' onclick ='editProduct(" + item.id + ")'>Edit Product</button>", "\n                    </div>\n                    <div class=\"product-item-actions\">\n                        <button class=\"add-to-cart\" onClick=\"addedToCart(").concat(item.id, ")\" >Add To Cart</button>\n                        <i class=\"favorite far fa-heart\" style = \"color: ").concat(item.liked == true ? "red" : "", "\" \n                         onclick=\"addedToFavorite(").concat(item.id, ")\"></i>   \n                    </div>\n                </div>");
  });
  productsDom.innerHTML = ProductsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products); //add to cart

function addedToCart(id) {
  if (localStorage.getItem("username")) {
    var _products = JSON.parse(localStorage.getItem("products")) || _products;

    var product = _products.find(function (item) {
      return item.id === id;
    });

    var isProductInCart = addedItem.some(function (i) {
      return i.id === product.id;
    });

    if (isProductInCart) {
      addedItem = addedItem.map(function (p) {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    } //UI


    cartProductDivDom.innerHTML = "";
    addedItem.forEach(function (item) {
      cartProductDivDom.innerHTML += "<p>".concat(item.title, " <span class='item-qty'>").concat(item.qty, "<span></p>");
    }); //save data

    localStorage.setItem('productsInCart', JSON.stringify(addedItem)); // add counter of items

    var cartProductItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  var unique = arr.map(function (item) {
    return item[filterType];
  }).map(function (item, i, _final) {
    return _final.indexOf(item) === i && i;
  }).filter(function (item) {
    return arr[item];
  }).map(function (item) {
    return arr[item];
  });
  return unique;
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

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
} // search function 


var input = document.querySelector("#search");
input.addEventListener('keyup', function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() === "") {
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
  }
});

function search(title, myArray) {
  /* for(var i =0 ; i <myArray.length ; i++)
   {
       if(myArray[i].title == title)
       {
           console.log(myArray[i]);
       }
   }*/
  var arr = myArray.filter(function (item) {
    return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
  });
  drawProductsUI(arr);
} //add to favorite


var favoritesItems = localStorage.getItem('productsFavorite') ? JSON.parse(localStorage.getItem('productsFavorite')) : [];

function addedToFavorite(id) {
  if (localStorage.getItem("username")) {
    var choosenItem = products.find(function (item) {
      return item.id === id;
    });
    choosenItem.liked = true;
    favoritesItems = [].concat(_toConsumableArray(favoritesItems), [choosenItem]);
    var uniqueProducts = getUniqueArr(favoritesItems, "id");
    localStorage.setItem('productsFavorite', JSON.stringify(uniqueProducts));
    products.map(function (item) {
      if (item.id == choosenItem.id) {
        item.liked = true;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = "login.html";
  }
} //filter products by size


var sizefilter = document.getElementById("size-filter");
sizefilter.addEventListener("change", getProductsFilterBySize);

function getProductsFilterBySize(e) {
  var val = e.target.value;
  var products = JSON.parse(localStorage.getItem("products")) || products;

  if (val === "all") {
    drawProductsUI(products);
  } else {
    products = products.filter(function (i) {
      return i.size === val;
    });
    drawProductsUI(products);
  }
} //Edit product 


function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}