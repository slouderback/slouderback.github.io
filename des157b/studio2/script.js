(function () {
  "use strict";

  const dataDisplay = document.getElementById("dataDisplay");
  const rawDataButton = document.getElementById("rawDataButton");
  const graphButton = document.getElementById("graphButton");
  const projectionButton = document.getElementById("projectionButton");

  let data;

  let active = 0;

  rawDataButton.addEventListener("click", function (e) {
    getData();
    active = 0;
  });

  graphButton.addEventListener("click", function (e) {
    getData();
    active = 1;
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
      html += `<div>${data[i].time}</div>`;
      html += `<div style="background-color: grey; max-width: ${
        data[i].num * 50
      }px">&#8205</div>`;
      html += "<br>";
    }
    return html;
  }

  getData();
})();
