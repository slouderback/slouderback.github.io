(function () {
  "use strict";
  console.log("reading js");

  let myForm = document.querySelector("#myForm");
  let madlib = document.querySelector("#madlib");

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let noun1 = document.querySelector("#noun1").value;
    let noun2 = document.querySelector("#noun1").value;
    let adj = document.querySelector("#adj").value;
    let verb = document.querySelector("#verb").value;

    let myText;

    if (noun1 && noun2 && adj && verb) {
      myText = `Here are some words: ${noun1}, ${noun2}, ${adj}, and ${verb}`;
    } else {
      myText = "Please complete the form so I can make your madlib!";
    }
    madlib.innerHTML = myText;

    let formData = document.querySelectorAll("input[type=text]");
    formData.forEach((textField) => {
      textField.value = "";
    });
  });
})();
