(function () {
  "use strict";

  Parse.initialize(
    "tSVC2QTlhtCodbbGsHa7XNJdeyXHCEA9XHF9xeIx",
    "rXwdfBAFGuEgTMsqSpPrERKx6DNm62PQl9NQ1657"
  ); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = "https://parseapi.back4app.com/";

  const form = document.getElementById("form");
  let data = [];

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
    console.log(results);
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

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Baby Boomers", "Generation X", "Millennials", "Generation Z"],
      datasets: [
        {
          label: "# of responses",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
