let thisTitle = document.querySelector(".titre");
let thisAuthor = document.querySelector(".auteur");
let thisImage = document.querySelector(".couverture");
let thisPrice = document.querySelector(".price");
let thisSummary = document.querySelector("quatrCouv");
let thisPTP;

// console.log("title :", thisTitle.innerText);
// console.log("author :", thisAuthor.innerText);
// console.log("image :", thisImage.src);
// console.log("price :", thisPrice.innerText);

chrome.runtime.onMessage.addListener((request) => {
  console.log("hello");
  if (request.message === "thisPTP" && request.data) {
    console.log("in content_fakepage.js, received thisPTP :", request.data);
    thisPTP = request.data;
    thisTitle.innerText = `${thisPTP.title}`;
    thisAuthor.innerText = `${thisPTP.author}`;
    thisImage.src = `${thisPTP.image}`;
    thisPrice.innerText = `${thisPTP.price}`;
    thisSummary.innerText = `${thisPTP.summary}`;
  }
});

// chrome.runtime.onMessage.addListener((request, response) => {
//   console.log("hello from the cart");
//   if (request.message === "a message") {
//     console.log("cartRequestReceived");
//     sendResponse({
//       data:thisPTP
//     });
//   };
// })

// const objectTest = {
//   author: "Aristote",
//   image: "https://m.media-amazon.com/images/I/41M2M2+AthL._SY445_SX342_.jpg",
//   price: "70 €",
//   title: "Oeuvres Complètes",
// };






 
// document.getElementById("header-cart-link").addEventListener("click", function() {
//   window.open('datapage.html', '_blank').focus();
// });

document.getElementById("header-cart-link").addEventListener("click", function () {
   console.log('fakepage : cartClicked')
    chrome.runtime.sendMessage({
      message: "cartClicked",
      data:thisPTP,
    });
    window.open("some.html", "win", "width=400,height=400");
  });
