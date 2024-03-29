(function () {
  "use strict";

  const button = document.querySelector("button");
  const body = document.querySelector("body");
  const banner = document.querySelector("#banner");
  const sections = document.querySelectorAll("section");

  const cubeFaces = document.querySelectorAll(".cube_face");

  const waveDark = document.querySelector("#wave_dark");
  const waveLight = document.querySelector("#wave_light");

  waveDark.style.display = "block";
  waveLight.style.display = "none";

  let mode = "dark";

  button.addEventListener("click", function () {
    if (mode === "dark") {
      body.className = "switch";
      banner.className = "switch";
      button.className = "switch";

      for (const section of sections) {
        section.className = "switch";
      }

      for (const cubeFace of cubeFaces) {
        cubeFace.classList.add("switch");
      }

      waveDark.style.display = "none";
      waveLight.style.display = "block";
      mode = "light";
    } else {
      body.removeAttribute("class");
      banner.removeAttribute("class");
      button.removeAttribute("class");

      for (const section of sections) {
        section.removeAttribute("class");
      }

      for (const cubeFace of cubeFaces) {
        cubeFace.classList.remove("switch");
      }

      waveDark.style.display = "block";
      waveLight.style.display = "none";
      mode = "dark";
    }
  });
})();
