



var animals = ["bird", "cat", "dog","trump","chicken","pig","walrus","squirrel","deer","polar bear","monkey","fish",
"panda","elephant","chipmunk","pikachu","chow chow","eagle","tiger","lion","bear"];

function renderButtons() { //creates buttons on top of the page
  $("#buttons-view").empty(); //clears existing buttongs

  for (var i = 0; i < animals.length; i++) { ////loops array until the list is completed

    var a = $("<button>"); //creates and adds attributes to the button
    a.addClass("animal btn btn-default");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);

  }
} //eof





$("#add-animal").on("click", function() { //when user clicks submit. 
  event.preventDefault(); //prevents page to refresh
  var animal = $("#animal-input").val().trim(); //takes value in submit bar and trims spaces
  console.log(animal); //logging
  animals.push(animal); //push to animals array on top
  $("#animal-input").val(""); //create search 
  renderButtons();
});//eof





$(document.body).on("click", ".animal", function() { //when user clicks on button on top
  $("#animal-view").empty(); //clears the gif section of html page
  var animal = $(this).attr("data-name"); //grabs that data-name value
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +animal+ "&api_key=WhDQrRmB143yu0Owh56SaGrDB1wnERGq&limit=20"; // build query to api 



  $.ajax({ //request data from API
    url: queryURL,
    method: "GET"
  }).done(function(response) { //stores data into response

  var results = response.data; //pass reponse.data from api to results
  console.log(results); //logging

  for (var i = 0; i < results.length; i++) {
    var animalDiv = $("<table>");
    animalDiv.addClass("col-lg-4");

    var p = $("<p>").text("Rating: " + results[i].rating); //adds rating from image of response

    var animalImage = $("<img>"); //create image

    console.log(results[i].images.original_still.url) //logging

    //add attributes to image when user clicks it will move from still to animate
    animalImage.attr("src", results[i].images.fixed_width_still.url);
    animalImage.attr("state", "still" );

    animalImage.attr("animate", results[i].images.fixed_width.url);
    animalImage.attr("still",  results[i].images.fixed_width_still.url);

    animalImage.addClass("gifs");


    //appends all data to animalDiv
    animalDiv.append(p);
    animalDiv.append(animalImage);
    //appends animalDiv to the div animal-view
    $("#animal-view").append(animalDiv);

  }//end of for loop
}) //end of ajax

}); //eof


$(document.body).on("click", ".gifs", function() { //swaps between animate and still image
  console.log("clicking gif"); //logging
  var state = $(this).attr("state"); //checks current state of the image;

  if (state === "still") { //if current image state is still it will replace src with animate link
    $(this).attr("src", $(this).attr("animate")); //updates state of img to animate
    $(this).attr("state", "animate"); //updates src of image
  } 
  else { //if not in still state
    $(this).attr("src", $(this).attr("still"));  //update img src with still image
    $(this).attr("state", "still"); //update img state of img to still
  }

});//eof


renderButtons(); //rend buttons on page startup.