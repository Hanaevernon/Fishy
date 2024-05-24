chrome.webNavigation.onCompleted.addListener(function () {
  RNGInit();
});

//SCAN RESULT
let PTP;

chrome.runtime.onMessage.addListener((request) => {
  console.log("there :", request.message === "scanPositive" && request.data);
  if (request.message === "scanPositive" && request.data) {
    console.log("RNGInitResult :", RNGInitResult);
    if (RNGInitResult <= 0.9) {
      console.log("P.T.P received from content_page.js :", request.data);
      PTP = request.data;
    }
  } else {
    console.log("RNG not passed");
    chrome.runtime.sendMessage({
      message: "noPTP",
    });
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "givePTP") {
    chrome.runtime.sendMessage({
      message: "sendPTP",
      data: PTP,
    });
  }
});

// SEND PTP TO POPUP

//POPUP SEARCH

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.greeting === "searchFPage") {
//     sendResponse({ farewell: "initFPage" });
//   }
// });

//FPAGE LOADED

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "searchFPage") {
    sendResponse({ farewell: "initFPage" });
  }
});

//DATA RECEPTION

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "saveToDatabase") {
    saveData(request.data);
  }
});

const RNGInit = () => {
  return Math.random();
};
let RNGInitResult = RNGInit();
