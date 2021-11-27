"use strict";

var getLang = localStorage.getItem('langDir');

if (getLang) {
  if (getLang == 'rtl') {
    changeDir('rtl');
  } else {
    changeDir('ltr');
  }
} //lang dir 


var en = document.getElementById("en_lang");
var ar = document.getElementById("ar_lang");
en.addEventListener("click", function () {
  return changeDir("ltr");
});
ar.addEventListener("click", function () {
  return changeDir("rtl");
});

function changeDir(dir) {
  document.documentElement.setAttribute("dir", dir);
  localStorage.setItem('langDir', dir);
}