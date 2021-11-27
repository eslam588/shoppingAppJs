//get data from localstorage

let get_user = localStorage.getItem("username");
let get_email = localStorage.getItem("email");



//variables

let userInput = document.getElementById("changeName");
let userEmailInput = document.getElementById("changeEmail"); 
let editForm =document.getElementById("edit-profile-form");
//let uploadImageUser = document.getElementById("upload-image-user");

userInput.value = get_user;
userEmailInput.value = get_email;

//let uploadImageUrl;

//events 

editForm.addEventListener("submit" , editProfileData);

//uploadImageUser.addEventListener("change" , uploadImage);

function editProfileData(e)
{
    e.preventDefault();
    localStorage.setItem("username" , userInput.value);
    localStorage.setItem("email" , userEmailInput.value);
    //uploadImageUrl = uploadImageUser.value;
    //localStorage.setItem("userImageUrl" , uploadImageUrl);

    setTimeout(() => {
         window.location = "profile.html"; 
    },500)
}


// function uploadImage() {
//     let file = this.files[0];
    
//     let types = ["image/jpeg" , "image/jpg"];

//     if(types.indexOf(file.type) == -1) {
//         alert("type not supported");
//         return ;
//     }
//     if(file.size >2 * 1024 * 1024 )
//     {
//         alert("alert not exced 2MG");
//         return;
//     }

//     getImageBased64(file);

//     //productImage = URL.createObjectURL(file);
// }

// function getImageBased64(file){
//    let reader = new FileReader()

//    reader.readAsDataURL(file)

//    reader.onload = function () {
//     uploadImageUrl = reader.result;
//    }

//    reader.onerror = function (){
//        alert("Error !")
//    }
// }