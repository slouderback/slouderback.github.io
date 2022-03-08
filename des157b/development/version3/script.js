(function () {
  "use strict";

  Parse.initialize(
    "tSVC2QTlhtCodbbGsHa7XNJdeyXHCEA9XHF9xeIx",
    "rXwdfBAFGuEgTMsqSpPrERKx6DNm62PQl9NQ1657"
  ); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = "https://parseapi.back4app.com/";

  const form = document.getElementById("form");
  let formTracker = document.getElementById("formTracker");
  let nextBtn = document.getElementById("next");
  let prevBtn = document.getElementById("previous");
  let submitBtn = document.getElementById("submit");
  let tabs = document.getElementsByClassName("tab");
  let currentTab = 0;

  let totalRows = 0;

  let viewDataNewspaperBooks = [0, 0, 0, 0];
  let viewDataTelevision = [0, 0, 0, 0];
  let viewDataWeb = [0, 0, 0, 0];
  let viewDataApps = [0, 0, 0, 0];

  let createDataNewspaperBooks = [0, 0, 0, 0];
  let createDataTelevision = [0, 0, 0, 0];
  let createDataWeb = [0, 0, 0, 0];
  let createDataApps = [0, 0, 0, 0];

  let newspaperBooksTrustValue = 0;
  let televisionTrustValue = 0;
  let webTrustValue = 0;
  let appsTrustValue = 0;

  let snackbar = document.getElementById("snackbar");

  nextBtn.addEventListener("click", function (e) {
    nextPrev(1);
  });

  prevBtn.addEventListener("click", function (e) {
    nextPrev(-1);
  });

  function formValidation() {
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!formValidation()) return false;
    let generation = form.elements["generation"].value;
    let viewPlatform = form.elements["viewPlatform"].value;
    let createPlatform = form.elements["createPlatform"].value;
    let newspaperBooksTrust = parseInt(
      form.elements["newspaperBooksTrust"].value
    );
    let televisionTrust = parseInt(form.elements["televisionTrust"].value);
    let webTrust = parseInt(form.elements["webTrust"].value);
    let appsTrust = parseInt(form.elements["appsTrust"].value);
    let mediaText = form.elements["mediaText"].value;

    console.log(generation);
    console.log(viewPlatform);
    console.log(createPlatform);
    console.log(typeof parseInt(newspaperBooksTrust));
    console.log(typeof parseInt(televisionTrust));
    console.log(typeof parseInt(webTrust));
    console.log(typeof parseInt(appsTrust));
    console.log(typeof mediaText);

    if (formValidation()) {
      saveNewFormResponse(
        generation,
        viewPlatform,
        createPlatform,
        newspaperBooksTrust,
        televisionTrust,
        webTrust,
        appsTrust,
        mediaText
      );
    } else {
      showFail("Missing required fields");
    }
  });

  form.addEventListener("change", function (e) {
    console.log("changed");
  });

  function showTab(a) {
    tabs[a].style.display = "flex";
    formTracker.innerHTML = `Step ${a + 1}/${tabs.length}`;

    if (a == 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "inline";
    }

    if (a == tabs.length - 1) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "inline";
    } else {
      nextBtn.style.display = "inline";
      submitBtn.style.display = "none";
    }
  }
  // Display first tab on page load
  showTab(currentTab);

  function nextPrev(a) {
    tabs[currentTab].style.display = "none";
    currentTab = currentTab + a;

    showTab(currentTab);
  }

  function showSuccess(str) {
    snackbar.innerHTML = str;
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.innerHTML = "";
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }

  function showFail(str) {
    snackbar.innerHTML = str;
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.innerHTML = "";
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }

  async function fetchData() {
    const formResponses = Parse.Object.extend("form_responses");
    const query = new Parse.Query(formResponses);
    const results = await query.ascending("createdAt").find();
    results.forEach((row) => {
      totalRows++;
      let generation = row.get("generation");
      let viewPlatform = row.get("viewPlatform");
      let createPlatform = row.get("createPlatform");

      let newspaperBooksTrust = row.get("newspaperBooksTrust");
      let televisionTrust = row.get("televisionTrust");
      let webTrust = row.get("webTrust");
      let appsTrust = row.get("appsTrust");

      let viewArrayToModify;
      let createArrayToModify;
      let positionToModify;

      if (viewPlatform == "newspaperBooks") {
        viewArrayToModify = viewDataNewspaperBooks;
      } else if (viewPlatform == "television") {
        viewArrayToModify = viewDataTelevision;
      } else if (viewPlatform == "web") {
        viewArrayToModify = viewDataWeb;
      } else if (viewPlatform == "apps") {
        viewArrayToModify = viewDataApps;
      }

      if (createPlatform == "newspaperBooks") {
        createArrayToModify = createDataNewspaperBooks;
      } else if (createPlatform == "television") {
        createArrayToModify = createDataTelevision;
      } else if (createPlatform == "web") {
        createArrayToModify = createDataWeb;
      } else if (createPlatform == "apps") {
        createArrayToModify = createDataApps;
      }

      if (generation == "boomers") {
        positionToModify = 0;
      } else if (generation == "genx") {
        positionToModify = 1;
      } else if (generation == "millennials") {
        positionToModify = 2;
      } else if (generation == "genz") {
        positionToModify = 3;
      }

      viewArrayToModify[positionToModify]++;
      createArrayToModify[positionToModify]++;

      newspaperBooksTrustValue += newspaperBooksTrust;
      televisionTrustValue += televisionTrust;
      webTrustValue += webTrust;
      appsTrustValue += appsTrust;
    });

    // Average the values out
    newspaperBooksTrustValue = newspaperBooksTrustValue / totalRows;
    televisionTrustValue = televisionTrustValue / totalRows;
    webTrustValue = webTrustValue / totalRows;
    appsTrustValue = appsTrustValue / totalRows;

    chartIt();
  }

  fetchData();

  async function saveNewFormResponse(a, b, c, d, e, f, g, h) {
    const formResponses = new Parse.Object("form_responses");

    formResponses.set("generation", a);
    formResponses.set("viewPlatform", b);
    formResponses.set("createPlatform", c);
    formResponses.set("newspaperBooksTrust", d);
    formResponses.set("televisionTrust", e);
    formResponses.set("webTrust", f);
    formResponses.set("appsTrust", g);
    formResponses.set("mediaText", h);
    try {
      let result = await formResponses.save();
      form.reset();
      showSuccess("Form submit success!");
      console.log("New object created with objectId: " + result.id);
      fetchData();
    } catch (error) {
      showFail("Form submit fail");
      console.log("Failed with error code: " + error.message);
    }
  }

  function chartIt() {
    const ctx1 = document.getElementById("media1").getContext("2d");
    const media1 = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Baby Boomers", "Generation X", "Millennials", "Generation Z"],
        datasets: [
          {
            data: viewDataNewspaperBooks,
            label: "Newspaper/Books",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            data: viewDataTelevision,
            label: "Television",
            backgroundColor: "rgba(255, 159, 64, 0.5)",
          },
          {
            data: viewDataWeb,
            label: "Web",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
          {
            data: viewDataApps,
            label: "Apps",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    const ctx2 = document.getElementById("media2").getContext("2d");
    const media2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Baby Boomers", "Generation X", "Millennials", "Generation Z"],
        datasets: [
          {
            data: createDataNewspaperBooks,
            label: "Newspaper/Books",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            data: createDataTelevision,
            label: "Television",
            backgroundColor: "rgba(255, 159, 64, 0.5)",
          },
          {
            data: createDataWeb,
            label: "Web",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
          {
            data: createDataApps,
            label: "Apps",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    const ctx3 = document.getElementById("trust").getContext("2d");
    const trust = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: [
          "Newspaper/Books Trust",
          "Television Trust",
          "Web Trust",
          "Apps Trust",
        ],
        datasets: [
          {
            data: [
              newspaperBooksTrustValue,
              televisionTrustValue,
              webTrustValue,
              appsTrustValue,
            ],
            label: "Trust",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
})();
