let productDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noproducts");


function drawFavoritesProductsUI(allProducts = []) {

    if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0 )
    {
        noProductsDom.innerHTML = `<P>There is no items</P>`;
    }

    let products = JSON.parse(localStorage.getItem('productsFavorite')) || allProducts ;
    let ProductsUI = products.map((item) => {
        return `
               <div class="product-item">
                    <img src=${item.imageUrl} class="product-item-image" alt="image" width="200px">
                    <div class="product-item-desc">
                        <h2>${item.title}</h2>
                        <p>${item.desc}</p>
                        <span>size : ${item.size}</span><br>
                        <span>Quantity: ${item.qty}<span>
                    </div>
                    <div class="product-item-actions">
                        <button class="add-to-cart" onClick="removeItemFromCart(${item.id})" >Remove From Favorite</button>    
                    </div>
                </div>`
    });
    productDom.innerHTML = ProductsUI.join("");
}
 
drawFavoritesProductsUI();

function removeItemFromCart(id){
    let productsFavorite = localStorage.getItem('productsFavorite');
    if(productsFavorite)
    {
        let items = JSON.parse(productsFavorite);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsFavorite" , JSON.stringify(filteredItems));
        drawFavoritesProductsUI(filteredItems);

    }
   
}
