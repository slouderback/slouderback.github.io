(function () {
  "use strict";

  Parse.initialize(
    "tSVC2QTlhtCodbbGsHa7XNJdeyXHCEA9XHF9xeIx",
    "rXwdfBAFGuEgTMsqSpPrERKx6DNm62PQl9NQ1657"
  ); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = "https://parseapi.back4app.com/";

  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let generation = form.elements["generation"].value;
    let viewPlatform = form.elements["viewPlatform"].value;
    let createPlatform = form.elements["createPlatform"].value;
    saveNewFormResponse(generation, viewPlatform, createPlatform);
    // console.log(generation);
    // console.log(viewPlatform);
    // console.log(createPlatform);
  });

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
      console.log("New object created with objectId: " + result.id);
      fetchData();
    } catch (error) {
      console.log(
        "Failed to create new object, with error code: " + error.message
      );
    }
  }
})();
