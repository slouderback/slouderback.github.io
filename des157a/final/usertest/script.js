(function () {
  "use strict";
  console.log("reading js");

  let imageDivs = document.querySelectorAll(".imageAndText");
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  // Updates windowHeight and Width on window resize
  window.addEventListener("resize", function () {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  });

  alert(
    "Hey! Welcome to my site! Try to do these 3 things. \n1) View every picture \n2) Intentionally move things around \n3) Navigate using clicks"
  );

  // Handles the movement left and right once an imageDiv reaches the top of the screen
  window.addEventListener("scroll", function (e) {
    imageDivs.forEach((div) => {
      if (div.getBoundingClientRect().top < 0) {
        div.childNodes[1].style.left = `${div.getBoundingClientRect().top}px`;
        div.childNodes[3].style.left = `${Math.abs(
          div.getBoundingClientRect().top
        )}px`;
      }
      if (div.getBoundingClientRect().top > 0) {
        div.childNodes[1].style.left = "0px";
        div.childNodes[3].style.left = "0px";
      }
    });
  });
})();
