(function () {
  "use strict";
  console.log("reading js");

  let myForm = document.querySelector(".myForm");
  let madlib = document.querySelector("#madlib");
  let story = document.querySelector("#story");
  let retry = document.querySelector("#retryButton");

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let productName = document.querySelector("#productName").value;
    let adj1 = document.querySelector("#adj1").value;
    let verb1 = document.querySelector("#verb1").value;
    let time = document.querySelector("#time").value;
    let adj2 = document.querySelector("#adj2").value;
    let verb2 = document.querySelector("#verb2").value;

    let myText;

    if (productName && adj1 && verb1 && time && adj2 && verb2) {
      myText = `Welcome to our fall Apple event! Today we have an exciting 
                new product that we have been working on for ${time} 
                and we cant wait to share it with all of you! We call it the 
                ${productName} and its our most ${adj1} yet. Personally 
                we feel as if it will ${verb1} your socks off. During our user 
                testing it was found to be very ${adj2} and it made our 
                users want to ${verb2}! You will be able to buy one right now 
                and it will be at your door sometime next week!`;
    } else {
      myText = "Please complete the form so I can make your madlib!";
    }
    myForm.className = "hidden";
    story.className = "visible";
    madlib.innerHTML = myText;
  });

  retry.addEventListener("click", function (e) {
    let formData = document.querySelectorAll("input[type=text]");
    formData.forEach((textField) => {
      textField.value = "";
    });
    myForm.className = "visible";
    story.className = "hidden";
    madlib.innerHTML = "";
  });
})();
