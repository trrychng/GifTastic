



var animals = ["bird", "cat", "dog"];

      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }





      // This function handles events where a movie button is clicked
      $("#add-animal").on("click", function() {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        console.log(animal);
        // Adding movie from the textbox to our array
        animals.push(animal);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

renderButtons()




    $(document.body).on("click", ".animal", function() {

      $("#animal-view").empty();
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=WhDQrRmB143yu0Owh56SaGrDB1wnERGq&limit=20";
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {


        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.original_still.url);
            console.log(results[i].images.original_still.url)
            animalImage.attr("state", "still" );
            animalImage.attr("animate", results[i].images.original.url);
            animalImage.attr("still",  results[i].images.original_still.url);
            animalImage.addClass("gifs");
            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#animal-view").append(animalDiv);

          // Creating a div to hold the movie
         
        }})

    });


  $(document.body).on("click", ".gifs", function() {
    console.log("clicking gif");
    var state = $(this).attr("state");


    if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
      }

    });
