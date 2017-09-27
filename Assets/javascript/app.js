$(function(){
// giffy API KEY: 4fGVtcP6gPr5FHXCp60Uj3sg0ymoaJ8Q

// create an array with a list of sports

var arrCartoons = ["The Flinstones", "Catdog", "SpongeBob SquarePants", "Recess", "Tom and Jerry", "Looney Tunes", "Rick and Morty", "Dragon Ball Z", "Aaahh!!! Real Monsters", "Dexters Laboratory", "Powderpuff Girls", "Johnny Bravo", "Doug", "Rugrats", "Pinky and the Brain", "Rocco's Modern Life", "Hey Arnold", "Ed, Edd n Eddy"]
//create a function that makes a button
var newBtn = "";
var btnName = "";
var btnId
//for loop that generates buttons for each string in arrCartoons
for (var i = 0; i < arrCartoons.length; i++) {
	makeButton(arrCartoons[i]);
	makeId(arrCartoons, i);
	moveButton();
}
function makeId(array, counter){
	array[counter].replace(/\s/g, '')
	array[counter]+= "button"
};


function makeButton(buttonName){
	newBtn = $("<button />").html(buttonName).attr("id", buttonName)

};
//create a function that appends content to an html div by ID
function moveButton(){
	$("#button-container").append(newBtn);
};
//create a function that stores user input on button click
	$("#addCartoon").click(function(){
		btnName = $("<#cartoon-input>")
		console.log("this button works");	
	});
//create a function that makes an ajax call
	//ajax call should produce 10 images, and image rating, still image 
//create a function that stores input value from sports-input id input element


	// Event listener for our cat-button


      // // Storing our giphy API URL for a random cat image
      // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+;

      // // Perfoming an AJAX GET request to our queryURL
      // $.ajax({
      //   url: queryURL,
      //   method: "GET"
      // })

      // // After the data from the AJAX request comes back
      // .done(function(response) {

      //   // Saving the image_original_url property
      //   var imageUrl = response.data.image_original_url;

      //   // Creating and storing an image tag
      //   var catImage = $("<img>");

      //   // Setting the catImage src attribute to imageUrl
      //   catImage.attr("src", imageUrl);
      //   catImage.attr("alt", "cat image");

      //   // Prepending the catImage to the images div
      //   $("#images").prepend(catImage);
});