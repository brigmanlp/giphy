//Instructions
//1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`. 
// 	* We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
// 	* Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on). 
// 	* This data is provided by the GIPHY API.
// 	* Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
$(document).ready(function() {
var topics = ["apples", "oranges", "bananas", "strawberries", "lemons"]; // Fruit theme for this app
var results;
// Create event listener for all button elements
// $("button").on("click", function() {

function displaygifDiv(){
	//clear the div where the giphy is displayed
	$("#gifs-appear-here").empty();
	// In this case, the "this" keyword refers to the button attribute that was clicked
	var fruit = $(this).attr("data-name");

	// Constructing a URL to search the Giphy API for the name of the fruit, see parameters below
	// Public API Key: &api_key=dc6zaTOxFJmzC
	// q - search query term or phrase
	// limit - (optional) number of results to return, maximum 100. Default 25.
	// offset - (optional) results offset, defaults to 0.
	// rating - (optional) limit results to those rated (y,g, pg, pg-13 or r).
	// lang - (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code. See list of supported languages here
	// fmt - (optional) return results in html or json format (useful for viewing responses as GIFs to debug/test)
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        fruit + "&api_key=dc6zaTOxFJmzC&limit=10&offset=2&rating=y";
        // "&api_key=dc6zaTOxFJmzC&limit=10&offset=2&rating=pg"

    // Performing the AJAX GET request from the Giphy API
    $.ajax({
    	url: queryURL,
    	method: "GET",
    })
    // Function to complete after the data comes back from the API
    .done(function(response){
    	console.log(queryURL);
    	console.log(response);
    	// Storing an array of results in the results variable
    	results = response.data;

    	// Looping over every result item
    	for (var i = 0; i < results.length; i++) {
    		// Only taking action if the photo has an appropriate rating
    		if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    			// Creating a div with the class "item"
    			var gifDiv = $("<div class='item'>");
    			// Storing the result item's rating
    			var rating = results[i].rating;
    			// Creating a paragraph tag with the result item's rating
    			var p = $("<p>").text("Rating: " + rating);
    			// Creating an image tag
    			var fruitImage = $("<img>");
    			// Giving the image tag a source (src) attribute of a property pulled off the result item
    			fruitImage.attr("src", results[i].images.fixed_height_still.url);
    			fruitImage.attr("data-still", fruitImage.attr("src"));
    			fruitImage.attr("data-animate", results[i].images.fixed_height.url);
    			fruitImage.on("click", function(){

    				if($(this).attr("src") === $(this).attr("data-still")){
                        
                        $(this).attr("src", $(this).attr("data-animate"));

                    } //these attributes allow the user to pause the gif
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                    }
    			});
    			//Appending the paragraph and fruitImage we created to the "gifDiv" div we created
    			gifDiv.addClass("thumbnail");
    			gifDiv.append(p);
    			gifDiv.append(fruitImage);
    			// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
    			$("#gifs-appear-here").prepend(gifDiv);
    		}
    	}
    });

}

     // Generic function for displaying fruit buttons 
    function renderButtons(){ 

        // Deletes the fruit buttons prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
        $("#buttonsView").empty();

        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++){

            // Then dynamicaly generates buttons for each item in the array

            // Note the jQUery syntax here... 
            var a = $("<button>") // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            a.addClass("fruits"); // Added a class 
            a.attr("data-name", topics[i]); // Added a data-attribute
            a.text(topics[i]); // Provided the initial button text
            $("#buttonsView").append(a); // Added the button to the HTML
        }
    }


    // This function handles addition of new heros
    $("#add-fruit").on("click", function(){
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var fruit = $("#fruit-input").val().trim();
        console.log(fruit);
        $("#fruit-input").val(" ");

        // The fruit from the textbox is then added to our array
        topics.push(fruit);
        console.log(topics);
        
        // Our array then runs which handles the processing of our topics array
        renderButtons();

        // We have this line so that users can hit "enter" instead of clicking on the button and it won"t move to the next page
        return false;
    })

    // ========================================================

    // Generic function for displaying the fruit gifs
    $(document).on("click", ".fruits", displaygifDiv);

    // ========================================================

    // This calls the renderButtons() function
    renderButtons();
});


