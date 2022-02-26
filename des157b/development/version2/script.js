(function () {
  "use strict";

  Parse.initialize(
    "tSVC2QTlhtCodbbGsHa7XNJdeyXHCEA9XHF9xeIx",
    "rXwdfBAFGuEgTMsqSpPrERKx6DNm62PQl9NQ1657"
  ); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = "https://parseapi.back4app.com/";

  const form = document.getElementById("form");
  let viewDataNewspaperBooks = [0, 0, 0, 0];
  let viewDataTelevision = [0, 0, 0, 0];
  let viewDataWeb = [0, 0, 0, 0];
  let viewDataApps = [0, 0, 0, 0];

  let createDataNewspaperBooks = [0, 0, 0, 0];
  let createDataTelevision = [0, 0, 0, 0];
  let createDataWeb = [0, 0, 0, 0];
  let createDataApps = [0, 0, 0, 0];

  var snackbar = document.getElementById("snackbar");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let generation = form.elements["generation"].value;
    let viewPlatform = form.elements["viewPlatform"].value;
    let createPlatform = form.elements["createPlatform"].value;
    if (generation && viewPlatform && createPlatform) {
      saveNewFormResponse(generation, viewPlatform, createPlatform);
    } else {
      showFail("Missing required fields");
    }
  });

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
      let generation = row.get("generation");
      let viewPlatform = row.get("viewPlatform");
      let createPlatform = row.get("createPlatform");

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
    });
    chartIt();
  }

  fetchData();

  async function saveNewFormResponse(a, b, c) {
    const formResponses = new Parse.Object("form_responses");

    formResponses.set("generation", a);
    formResponses.set("viewPlatform", b);
    formResponses.set("createPlatform", c);
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
          },
        },
      },
    });
  }
})();
