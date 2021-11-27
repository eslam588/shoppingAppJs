



//define products
let productsDom = document.querySelector(".products");

let products = productsDB;

// display products

let drawProductsUI;
(drawProductsUI = function ( products = []) {
    let ProductsUI = products.map( (item) => {
        return `
               <div class="product-item" style= "border: ${item.isMe === 'yes' ? "2px solid green" : ""}">
                    <img src=${item.imageUrl} class="product-item-image" alt="image" width="200px">
                    <div class="product-item-desc">
                        <a onclick="saveItemData(${item.id})">${item.title}</a>
                        <p>${item.desc}</p>
                        <span>size : ${item.size}</span>
                        ${item.isMe === "yes" &&
                         "<button class ='edit-product' onclick ='editProduct(" + item.id + ")'>Edit Product</button>"}
                    </div>
                    <div class="product-item-actions">
                        <button class="add-to-cart" onClick="addedToCart(${item.id})" >Add To Cart</button>
                        <i class="favorite far fa-heart" style = "color: ${item.liked == true ? "red" : "" }" 
                         onclick="addedToFavorite(${item.id})"></i>   
                    </div>
                </div>`
    });
    productsDom.innerHTML = ProductsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);

 

//add to cart
function addedToCart(id) {
    if(localStorage.getItem("username")) {
        let products = JSON.parse(localStorage.getItem("products")) || products;
        let product = products.find((item) => item.id === id);
        let isProductInCart = addedItem.some(i => i.id === product.id);
        if(isProductInCart)
        {
            addedItem = addedItem.map((p) => {
                if(p.id === product.id)  p.qty +=1;
                return p;
            })           
        }
        else{
            addedItem.push(product);
        }

        //UI
        cartProductDivDom.innerHTML = "";
        addedItem.forEach((item) => {
            cartProductDivDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}<span></p>`
        });

        //save data
        localStorage.setItem('productsInCart' , JSON.stringify(addedItem));

        // add counter of items
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML= cartProductItems.length;
    }
    else{
        window.location = "login.html";
    } 
}

function  getUniqueArr (arr , filterType){
    let unique = arr.map((item) => item[filterType])
                    .map((item , i , final) => final.indexOf(item) === i && i)
                    .filter((item) => arr[item])
                    .map((item) => arr[item]);
    return unique;
}

// open cart menu
function openCartMenu () { 
    if (cartProductDivDom.innerHTML != "") {
       if (cartProductMenu.style.display == "block"){
           cartProductMenu.style.display= "none";
       }
       else {
           cartProductMenu.style.display= "block";
       }
    
    }   
}


function saveItemData(id){
    localStorage.setItem("productId" , id);
    window.location = "cartDetails.html";
}


// search function 

let input = document.querySelector("#search");

input.addEventListener('keyup' , function(e){
      
            search(e.target.value , JSON.parse(localStorage.getItem("products")));
        
        if(e.target.value.trim() === "")
        {
            drawProductsUI(JSON.parse(localStorage.getItem("products")));
        }
});
function search(title , myArray){
    /* for(var i =0 ; i <myArray.length ; i++)
     {
         if(myArray[i].title == title)
         {
             console.log(myArray[i]);
         }
     }*/

     let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
     drawProductsUI(arr);
     
}



//add to favorite
let favoritesItems = localStorage.getItem('productsFavorite')
    ? JSON.parse(localStorage.getItem('productsFavorite'))
    : [] ;

function addedToFavorite(id) {
    if(localStorage.getItem("username")) {
        let choosenItem = products.find((item) => item.id === id);
        choosenItem.liked=true;
        favoritesItems = [...favoritesItems , choosenItem];
        let uniqueProducts = getUniqueArr(favoritesItems , "id");
        localStorage.setItem('productsFavorite' , JSON.stringify(uniqueProducts));
        products.map((item) => {
             if(item.id == choosenItem.id)
             {
                 item.liked= true;
             }
        });  
        localStorage.setItem('products' , JSON.stringify(products));
        drawProductsUI(products);
    }
    else{
        window.location = "login.html";
    } 
}

//filter products by size

let sizefilter = document.getElementById("size-filter");
sizefilter.addEventListener("change" , getProductsFilterBySize);
function getProductsFilterBySize(e){
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem("products")) || products;

    if(val === "all") {
        drawProductsUI(products);
    }
    else{
        products = products.filter((i) => i.size === val);
        drawProductsUI(products);
    }
}

//Edit product 
function editProduct(id) {
    localStorage.setItem("editProduct" , id);
    window.location = "editProduct.html";
}

