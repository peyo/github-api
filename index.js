'use strict';

//Function that handles errors
function handleErrors(response) {
  if (!response.ok) {
    $(".error").removeClass("hidden");
    $(".error").html(
      `<h2>Something went wrong.</h2><p>Wait, and try your search again.</p>`
    );
    $(".results").hide();
    $(".error").show();
  }
  return response
}

//Function that handles non-errors
function handleOK(response) {
  if (response.ok) {
    $(".results").show();
    $(".error").hide();
  }
  return response
}

//Take handle from input field and pass it into ${x} in the endpoint to fetch
//Then, run handleErrors function to see if there are any errors. If error exist, write message in DOM
//If no errors exist, run response that leads to the function displayResults
function getRepos() {
  let x = document.getElementById("handle").value
  fetch(`https://api.github.com/users/${x}/repos`)
    .then(handleErrors)
    .then(handleOK)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => console.log(error));
}

//Remove hidden and display the results section
function displayResults(responseJson) {
  console.log(responseJson);
for(let i=0; i<responseJson.length; i++) {
    $(".results").removeClass("hidden");
    $(".results").append(
      `<a href=${responseJson[i].html_url}><b>${responseJson[i].name}</b></a><br><br>`
    );
  }
}

//Remove default action of submit button
//If no handle is entered into the form, return a message stating that a breed is needed, stop rest of app from working
//If handle is entered, run getDogImage function
//Clear search results when new search is performed
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    let x = document.getElementById("handle").value
    if (x === "") {
      alert("Enter a handle.");
    } else {
      $(".results").html("");
      getRepos();
    }
  });
}

$(watchForm);