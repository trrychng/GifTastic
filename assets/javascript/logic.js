



var animals = ["bird", "cat", "dog","trump","panda","elephant","chipmunk","pikachu","chow chow","eagle","tiger","lion","bear"];

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
        $("#animal-input").val("");
        renderButtons();

      });






    $(document.body).on("click", ".animal", function() {

      $("#animal-view").empty();
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=WhDQrRmB143yu0Owh56SaGrDB1wnERGq&limit=20";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {


        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {


            var animalDiv = $("<div>");


            var p = $("<p>").text("Rating: " + results[i].rating);


            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.original_still.url);
            console.log(results[i].images.original_still.url)
            animalImage.attr("state", "still" );
            animalImage.attr("animate", results[i].images.original.url);
            animalImage.attr("still",  results[i].images.original_still.url);
            animalImage.addClass("gifs");

            animalDiv.append(p);
            animalDiv.append(animalImage);


            $("#animal-view").append(animalDiv);


         
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