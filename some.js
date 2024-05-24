let thisPTP;

console.log("je fonctionne")

let thisTitle = document.querySelector(".titre");
let thisAuthor = document.querySelector(".Author");
let thisPrice = document.querySelector(".total-price");
let thisImage = document.querySelector(".image");

chrome.runtime.onMessage.addListener((request) => {
  console.log("helloPanier", request.message);
  if (request.message === "thisPTP") {
    console.log("in some.js, received thisPTP :", request.data);
    thisPTP = request.data;
    thisTitle.innerText = `${thisPTP.title}`;
    thisAuthor.innerText = `${thisPTP.author}`;
    thisImage.src = `${thisPTP.image}`;
    thisPrice.innerText = `${thisPTP.price}`;
  }
});

// console.log("titre :", thisTitle.innerText);
// console.log("author :", thisAuthor.innerText);
// console.log("price :", thisPrice.innerText)


// thisTitle.innerText = `${produit.titre}`;
// thisAuthor.innerText = `${produit.author}`;
// thisPrice.innerText = `${produit.totalprice}`;

function panier() {
    window.location.href = "file:///C:/Users/admin/Documents/Fishy_final/Fishy-final/datapage.html"
};
