let productDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noproducts");


function drawCartProductsUI(allProducts = []) {

    if (JSON.parse(localStorage.getItem("productsInCart")).length === 0 )
    {
        noProductsDom.innerHTML = `<P>There is no items</P>`;
    }

    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts ;
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
                        <button class="add-to-cart" onClick="removeItemFromCart(${item.id})" >Remove From Cart</button>    
                    </div>
                </div>`
    });
    productDom.innerHTML = ProductsUI.join("");
}
 
drawCartProductsUI();

function removeItemFromCart(id){
    let productsInCart = localStorage.getItem('productsInCart');
    if(productsInCart)
    {
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart" , JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems);

    }
}

