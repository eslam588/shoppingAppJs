//check if there is items in localstorage

let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let cartProductMenu = document.querySelector(".carts-products");
shoppingCartIcon.addEventListener("click" , openCartMenu);



let addedItem = localStorage.getItem('productsInCart')
? JSON.parse(localStorage.getItem('productsInCart'))
: [] ;

if(addedItem){
addedItem.map( (item) => {
cartProductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
});
badgeDom.style.display = "block";
badgeDom.innerHTML += addedItem.length;

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