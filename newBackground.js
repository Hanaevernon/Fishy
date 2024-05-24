const handlePTP = request => {
  return new Promise((resolve, reject) => {
    console.log("Received message:", request);
    try {
      console.log("Processing scanPositive message...");
      resolve({ success: true, request: request.data });
    } catch (error) {
      console.error(error);
      reject("Promise not resolved.");
    }
  });
};

chrome.runtime.onMessage.addListener(request => {
  if (request.message === "scanPositive" && request.data) {
    handlePTP(request)
      .then(response => {
        console.log("Message handling successful :", response.request);
        let PTP = response;
        chrome.runtime.onMessage.addListener(request => {
          if (request.message === "givePTP") {
            chrome.runtime.sendMessage(
              {
                message: "sendPTP",
                data: PTP
              },
              () => {
                console.log("background send PTP do popup");
              }
            );
          }
        });
      })
      .catch(error => {
        console.error("Message handling failed :", error);
        console.log("background could not send PTP to popup");
      });
  }
});

// Trying to communicate with content_fakepage.js :
/*
chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "newPTP" && request.data) {
    console.log("background received newPTP from popup :", request.data);
    const url =
      "file:///C:/Users/Marion/Documents/Ada/Semaines%20Projets/Web%20Extension/Fishy/testfake.html";
    // Get all tabs and found the one with matching url

    chrome.tabs.onUpdated.addListener((id, changeInfo) => {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          let tabId = tabs[0].id;
          if (changeInfo.url === url && tabId === tabs[0].id) {
            console.log("current tab updated !");
            chrome.runtime.sendMessage(tabId, {
              message: "thisPTP",
              data: request.data,
            });
          }
        }
      );
    });
  }
});
*/
let PTP;

const getCurrentTab = () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      const currentTab = tabs[0];
      return currentTab.id;
    }
  );
};

chrome.runtime.onMessage.addListener(request => {
  if (request.message === "newPTP" && request.data) {
    console.log("Background received newPTP from popup:", request.data);
    const url =
      "file:///D:/Users/Philippe/Ada%20Tech%20School/Code/Projets/Janvier/Fishy/testfake.html";

    chrome.tabs.onUpdated.addListener((id, changeInfo) => {
      console.log(id);

      console.log(changeInfo.url);
      console.log("current tab updated");
      chrome.tabs.sendMessage(id, {
        message: "thisPTP",
        data: request.data
      });
      console.log("in background, thisPTP :", request.data);
      PTP = request.data;
  })
}});

chrome.runtime.onMessage.addListener((message) => {
  console.log("cartBackground1")
  if(message.message === "cartClicked") {
    console.log("cartBackground2");
    chrome.runtime.sendMessage({
      message: "thisCart",
      data: PTP
    });
  }else {
  console.log("tu te plantes crétin")
  }



}
  
  
  )


