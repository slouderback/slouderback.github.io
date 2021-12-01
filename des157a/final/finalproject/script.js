(function () {
  "use strict";
  console.log("reading js");

  let imageDivs = document.querySelectorAll(".imageAndText");
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let introText = document.getElementById("introText");
  let chevron = document.getElementById("chevron");
  let stuck = true;

  setTimeout(() => {
    if (stuck) {
      chevron.style.display = "flex";
    }
  }, 6000);

  // Updates windowHeight and Width on window resize
  window.addEventListener("resize", function () {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  });

  introText.addEventListener("click", function (e) {
    window.scrollBy({ top: window.innerHeight, left: 0, behavior: "smooth" });
  });

  // Handles the movement left and right once an imageDiv reaches the top of the screen
  window.addEventListener("scroll", function (e) {
    if (imageDivs[0].getBoundingClientRect().top - windowHeight < 0) {
      stuck = false;
      chevron.style.display = "none";
    }
    // Loop functionality excludes the last element of imageDivs because there is no
    // content for the last imageDiv to move out of the way for.
    imageDivs.forEach((div, i) => {
      if (div.getBoundingClientRect().top < 0 && i != imageDivs.length - 1) {
        div.childNodes[1].style.left = `${div.getBoundingClientRect().top}px`;
        div.childNodes[3].style.left = `${Math.abs(
          div.getBoundingClientRect().top
        )}px`;
      }
      if (div.getBoundingClientRect().top > 0 && i != imageDivs.length - 1) {
        div.childNodes[1].style.left = "0px";
        div.childNodes[3].style.left = "0px";
      }
    });
  });
})();
