(function () {
  "use strict";

  const dataDisplay = document.getElementById("dataDisplay");
  const rawDataButton = document.getElementById("rawDataButton");
  const graphButton = document.getElementById("graphButton");
  const projectionButton = document.getElementById("projectionButton");
  const switchButton = document.getElementById("switchButton");

  const body = document.querySelector("body");

  let data;

  let active = 0;
  rawDataButton.style.backgroundColor = "#747474";

  rawDataButton.addEventListener("click", function (e) {
    rawDataButton.style.backgroundColor = "#747474";
    graphButton.style.backgroundColor = "#575757";
    getData();
    active = 0;
  });

  graphButton.addEventListener("click", function (e) {
    rawDataButton.style.backgroundColor = "#575757";
    graphButton.style.backgroundColor = "#747474";
    getData();
    active = 1;
  });

  let mode = "dark";
  switchButton.addEventListener("click", function (e) {
    if (mode === "dark") {
      body.className = "switch";
      switchButton.className = "switch";
      // dataDisplay.className = "switch";
      mode = "light";
    } else {
      body.removeAttribute("class");
      switchButton.removeAttribute("class");
      // dataDisplay.removeAttribute("class");
      mode = "dark";
    }
  });

  async function getData() {
    const barkingData = await fetch("data.json");
    data = await barkingData.json();

    switch (active) {
      case 0:
        dataDisplay.innerHTML = outputHTMLRaw(data);
        break;
      case 1:
        dataDisplay.innerHTML = outputHTMLGraph(data);
    }
  }

  function outputHTMLRaw(data) {
    let html = "";

    for (let i = 0; i < data.length; i++) {
      for (let key in data[i]) {
        html += "<div>";
        html += `${key == "num" ? "barks" : key}: ${data[i][key]}`;
        html += "</div>";
      }
      html += "<br>";
    }
    return html;
  }

  function outputHTMLGraph(data) {
    let html = "";

    for (let i = 0; i < data.length; i++) {
      html += `<div>${data[i].time} minutes</div>`;
      html += `<div style="background-color: grey; max-width: ${
        data[i].num * 50
      }px">&#8205</div>`;
      html += "<br>";
    }
    return html;
  }

  getData();
})();
