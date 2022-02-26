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
      console.log(row.id + " " + row.get("generation"));
      let generation = row.get("generation");
      let viewPlatform = row.get("viewPlatform");

      if (generation == "boomers" && viewPlatform == "newspaperBooks") {
        viewDataNewspaperBooks[0]++;
      } else if (generation == "boomers" && viewPlatform == "television") {
        viewDataTelevision[0]++;
      } else if (generation == "boomers" && viewPlatform == "web") {
        viewDataWeb[0]++;
      } else if (generation == "boomers" && viewPlatform == "apps") {
        viewDataApps[0]++;
      }

      if (generation == "genx" && viewPlatform == "newspaperBooks") {
        viewDataNewspaperBooks[1]++;
      } else if (generation == "genx" && viewPlatform == "television") {
        viewDataTelevision[1]++;
      } else if (generation == "genx" && viewPlatform == "web") {
        viewDataWeb[1]++;
      } else if (generation == "genx" && viewPlatform == "apps") {
        viewDataApps[1]++;
      }

      if (generation == "millennials" && viewPlatform == "newspaperBooks") {
        viewDataNewspaperBooks[2]++;
      } else if (generation == "millennials" && viewPlatform == "television") {
        viewDataTelevision[2]++;
      } else if (generation == "millennials" && viewPlatform == "web") {
        viewDataWeb[2]++;
      } else if (generation == "millennials" && viewPlatform == "apps") {
        viewDataApps[2]++;
      }

      if (generation == "genz" && viewPlatform == "newspaperBooks") {
        viewDataNewspaperBooks[3]++;
      } else if (generation == "genz" && viewPlatform == "television") {
        viewDataTelevision[3]++;
      } else if (generation == "genz" && viewPlatform == "web") {
        viewDataWeb[3]++;
      } else if (generation == "genz" && viewPlatform == "apps") {
        viewDataApps[3]++;
      }
    });
    chartIt();
  }

  fetchData();

  async function saveNewFormResponse(a, b, c) {
    //Create your Parse Object
    const formResponses = new Parse.Object("form_responses");

    //Define its attributes
    formResponses.set("generation", a);
    formResponses.set("viewPlatform", b);
    formResponses.set("createPlatform", c);
    try {
      //Save the Object
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
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Baby Boomers", "Generation X", "Millennials", "Generation Z"],
        datasets: [
          {
            data: viewDataNewspaperBooks,
            label: "Newspaper/Books",
            backgroundColor: "red",
          },
          {
            data: viewDataTelevision,
            label: "Television",
            backgroundColor: "green",
          },
          {
            data: viewDataWeb,
            label: "Web",
            backgroundColor: "blue",
          },
          {
            data: viewDataApps,
            label: "Apps",
            backgroundColor: "yellow",
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
