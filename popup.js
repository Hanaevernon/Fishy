// Demande au background.js de lui envoyer PTP
document.getElementById("search").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    message: "givePTP",
  });
});

const generateDiscount = () => {
  let randomDiscount = Math.random() * (40 - 8) + 8;
  randomDiscount = Math.round(randomDiscount * 100) / 100;
  return randomDiscount;
};

const applyDiscount = (originalPrice, discount) => {
  console.log("originalPrice :", originalPrice);
  let discountPrice = originalPrice * (1 - discount / 100);
  console.log("in applyDiscount 1: ", discountPrice);
  discountPrice = Math.round(discountPrice * 100) / 100;
  console.log("in applyDiscount 2: ", discountPrice);
  discountPrice = `${discountPrice} €`;
  return discountPrice;
};

// Listen to PTP send and respond accordingly
chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "sendPTP" && request.data) {
    // function to reset html content of popup.html
    // display overlay1
    const response = request.data;
    const info = response.request;
    document.getElementById("search").style.display = "none";
    document.getElementById("overlay1").style.display = "flex";
    console.log("Trop facile :", info);
    // changer le prix à afficher avec la discount
    let priceWithCurrency = info.price;
    let modifyStringPrice = priceWithCurrency
      .replace(/,/g, ".")
      .replace(/€/g, "");
    console.log("modifyStringPrice :", modifyStringPrice);
    const price = parseFloat(modifyStringPrice);
    let discountPercentage = generateDiscount();
    let discountPrice = applyDiscount(price, discountPercentage);
    discountPercentage = ` Discount : ${discountPercentage} %`;

    // formate le nom de l'auteur
    let bugAuthor = info.author;
    console.log("bugAuthor", bugAuthor);
    let newAuthor = bugAuthor.replace(/\s*\(.*\),/, "");
    console.log("newAuthor", newAuthor);

    // objet des éléments à display sur popup.html
    const display = {
      author: newAuthor,
      image: info.image,
      title: info.title,
      oldPrice: `Prix actuel : ${priceWithCurrency}`,
      newPrice: `Nouveau prix : ${discountPrice}`,
      discountPercentage: discountPercentage,
    };

    // associe à chaque élément de overlay1 les éléments à display
    const thisTitle = document.getElementById("title");
    thisTitle.innerText = display.title;

    const thisImage = document.getElementById("image");
    thisImage.src = display.image;

    const thisOldPrice = document.getElementById("oldPrice");
    thisOldPrice.innerText = display.oldPrice;

    const thisAuthor = document.getElementById("author");
    thisAuthor.innerText = display.author;

    const thisNewPrice = document.getElementById("newPrice");
    thisNewPrice.innerText = display.newPrice;

    const thisDiscountPercentage =
      document.getElementById("discountPercentage");
    thisDiscountPercentage.innerText = display.discountPercentage;

    const displayInfo = [
      thisTitle,
      thisImage,
      thisOldPrice,
      thisAuthor,
      thisNewPrice,
      thisDiscountPercentage,
    ];
    // affiche les éléments.
    displayInfo.forEach((element) => {
      element.style.display = "block";
    });

    // info à envoyer à content_fake_page.js
    const data = {
      author: newAuthor,
      image: info.image,
      title: info.title,
      price: discountPrice,
    };

    document.getElementById("go").addEventListener("click", () => {
      window.close();
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, {
          url: "file:///C:/Users/admin/Documents/Fishy_final/Fishy-final/testfake.html",
        });
      });
      chrome.runtime.sendMessage({
        message: "newPTP",
        data: data,
      });
      console.log("popup send PTP to content_fake_page");
    });
  } else {
    console.log("In popup, no PTP received from background' ");
    document.getElementById("search").style.display = "none";
    document.getElementById("overlay2").style.display = "flex";
  }
});
