// variables

let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect  = document.getElementById("product-size");
let createForm = document.getElementById("create-form");
let inputFile = document.getElementById("upload-image-file");

let productSizeValue;
let productImage;
 
//events
productSizeSelect.addEventListener("change" , getProductSizeValue);
createForm.addEventListener("submit" , createProductFun);
inputFile.addEventListener("change" , uploadImage);

//functions
function getProductSizeValue(e) {
    productSizeValue = e.target.value;
}

function createProductFun(e) {
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem('products')) || productsDB;
    let nameValue = productName.value;
    let descValue = productDesc.value;
    

    if(nameValue && descValue)
    {
        let obj = {
            id : allProducts ? allProducts.length + 1 : 1 ,
            qty : 1 , 
            imageUrl: productImage,
            size : productSizeValue , 
            title : nameValue ,
            desc : descValue ,
            isMe : "yes"
        };
    
        let newProducts = allProducts ? [...allProducts , obj] : [obj] ;
        localStorage.setItem("products" , JSON.stringify(newProducts));
    
        productName.value = "";
    
        productDesc.value = "";
        productSizeSelect.value = "";

        setTimeout(()=> {
            window.location = "index.html";
        }, 500)
    }

    else{
        alert("enter your data");
    }

    

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