let productDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noproducts");




let drawProductsUI;
(drawProductsUI = function ( products = []) {
    let myProducts = products.filter((item) => item.isMe === "yes");

    console.log("myproducts" , myProducts);
    if(myProducts.length != 0)
    {
        console.log("yes")
        let ProductsUI = myProducts.map( (item) => {
            return `
                   <div class="product-item" style= "border: ${item.isMe === 'yes' ? "2px solid green" : ""}">
                        <img src=${item.imageUrl} class="product-item-image" alt="image" width="200px">
                        <div class="product-item-desc">
                            <a onclick="saveItemData(${item.id})">${item.title}</a>
                            <p>${item.desc}</p>
                            <span>size : ${item.size}</span>
                             <button class ='edit-product' onclick ='editProduct(${item.id})'>Edit Product</button>

                              <br>

                             <button class ='edit-product' onclick ='deleteProduct(${item.id})'>Delete Product</button>
                        </div>
                    </div>`
        });
        productDom.innerHTML = ProductsUI.join("");
    } 
    else{
        console.log("no")
        noProductsDom.innerHTML = "No Products !!"
    }
    
})(JSON.parse(localStorage.getItem("products")) || productsDB);

//Edit product 
function editProduct(id) {
    localStorage.setItem("editProduct" , id);
    window.location = "editProduct.html";
}


//delete product

function deleteProduct(id)
{
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let myProducts = products.filter((item) => item.isMe === "yes");
    let filtered = myProducts.filter((i) => i.id !== id);
    let clickedItem = myProducts.find((i) => i.id === id );
    products = products.filter((i) => i.id !== clickedItem.id);
    localStorage.setItem("products", JSON.stringify(products));
    
    drawProductsUI(filtered);
    
    
    
}