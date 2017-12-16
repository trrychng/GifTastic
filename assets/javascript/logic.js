



var animals = ["bird", "cat", "dog"];

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");

          a.addClass("animal");

          a.attr("data-name", animals[i]);

          a.text(animals[i]);

          $("#buttons-view").append(a);
        }
      }






      $("#add-animal").on("click", function() {
        event.preventDefault();

        var animal = $("#animal-input").val().trim();

        console.log(animal);

        animals.push(animal);

        renderButtons();

      });






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


renderButtons()