(function () {
  "use strict";
  console.log("reading js");

  let imageDivs = document.querySelectorAll(".imagesContainer div");
  let button = document.querySelector("button");
  let currentImage = imageDivs.length - 1;
  imageDivs[currentImage].style.display = "flex";

  // Utility function to get a random Int instead of a random float
  function getRandomInt(maxVal) {
    return Math.floor(Math.random() * maxVal);
  }

  imageDivs.forEach((imageDiv) => {
    imageDiv.addEventListener("click", function () {
      // This allows us to keep track of what image is being displayed
      if (currentImage > 0) {
        currentImage--;
        setTimeout(function () {
          imageDivs[currentImage].style.display = "flex";
        }, 100);
      }

      let moveAmount = 200;

      let randomInt = getRandomInt(4);
      // This switch statement uses the randomInt to control which direction
      // the divs move when the user clicks on them.
      // There is no default case because all possible cases are covered.
      switch (randomInt) {
        case 0:
          moveAmount = moveAmount * -1;
          imageDiv.style.top = `${moveAmount}%`;
          setTimeout(function () {
            imageDiv.style.display = "none";
          }, 500);
          break;
        case 1:
          imageDiv.style.left = `${moveAmount}%`;
          setTimeout(function () {
            imageDiv.style.display = "none";
          }, 500);
          break;
        case 2:
          imageDiv.style.top = `${moveAmount}%`;
          setTimeout(function () {
            imageDiv.style.display = "none";
          }, 500);
          break;
        case 3:
          moveAmount = moveAmount * -1;
          imageDiv.style.left = `${moveAmount}%`;
          setTimeout(function () {
            imageDiv.style.display = "none";
          }, 500);
          break;
        default:
          console.log("Something is broken");
          break;
      }
    });
  });

  // Re sets the position of all of the image divs and the counter
  // Also it sets the first image back to display: flex so it can be seen
  button.addEventListener("click", function () {
    imageDivs.forEach((imageDiv) => {
      currentImage = imageDivs.length - 1;
      imageDivs[currentImage].style.display = "flex";
      imageDiv.style.left = `50%`;
      imageDiv.style.top = `400px`;
    });
  });
})();
