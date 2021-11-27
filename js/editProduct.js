// variables
let products = JSON.parse(localStorage.getItem("products")) || productsDB ;
let productId = JSON.parse(localStorage.getItem("editProduct"));
let getProduct = products.find((i)=> i.id === productId);

console.log("before update", getProduct);

let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect  = document.getElementById("product-size");
let updateForm = document.getElementById("update-form");
let inputFile = document.getElementById("upload-image-file");
let productSizeValue;
let productImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
productImage = getProduct.imageUrl;


//events
productSizeSelect.addEventListener("change" , getProductSizeValue);
updateForm.addEventListener("submit" , updateProductFun);
inputFile.addEventListener("change" , uploadImage);


function getProductSizeValue(e) {
    productSizeValue = e.target.value;
}

function updateProductFun(e) {
    e.preventDefault();

    getProduct.title = productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size = productSizeValue;
    getProduct.imageUrl = productImage;

    console.log("after update" , getProduct);

    localStorage.setItem("products" , JSON.stringify(products));

   setTimeout(() => {
      window.location = "index.html"

    }, 500);

}

//upload image

function uploadImage() {
     let file = this.files[0];
     
     let types = ["image/jpeg" , "image/jpg"];

     if(types.indexOf(file.type) == -1) {
         alert("type not supported");
         return ;
     }
     if(file.size >2 * 1024 * 1024 )
     {
         alert("alert not exced 2MG");
         return;
     }

     getImageBased64(file);

     //productImage = URL.createObjectURL(file);
}

function getImageBased64(file){
    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {
        productImage = reader.result;
    }

    reader.onerror = function (){
        alert("Error !")
    }
}
