$(function(){

// create an array with a list of cartoons

var arrCartoons = ["The Flinstones", "Catdog", "SpongeBob SquarePants", "Recess", "Tom and Jerry", "Looney Tunes", "Rick and Morty", "Dragon Ball Z", "Aaahh!!! Real Monsters", "Dexters Laboratory", "Powderpuff Girls", "Johnny Bravo", "Doug", "Rugrats", "Pinky and the Brain", "Rocco's Modern Life", "Hey Arnold", "Ed, Edd n Eddy"]
//create a function that makes a button
var arrCartoonIds = [];
var arrCartoonURL = [];
var newBtn = "";
var inputBtn = "";
var addButton ="";


//for loop that generates buttons for each string in arrCartoons
function addInitialButtons(){
  for (var i = 0; i < arrCartoons.length; i++) {
    makeArrId(arrCartoons, arrCartoonIds, i);
    makeArrURL(arrCartoons, arrCartoonURL, i);
    makeButton(arrCartoons[i], arrCartoonIds[i], arrCartoonURL[i]);
  	moveButton(inputBtn);
  };
};
//function that adds new buttons to the arrcartoons ID and displays them
function addInputButtons(){
  arrCartoons.push(inputBtn);
  makeInputId(inputBtn, arrCartoonIds, (arrCartoons.length - 1));
  makeInputURL(inputBtn, arrCartoonURL, (arrCartoons.length - 1));
  makeButton(inputBtn, arrCartoonIds[arrCartoons.length - 1], arrCartoonURL[arrCartoons.length - 1]);
  moveButton(inputBtn);
}
//function that adds counter-th value of array in outputArr, removes the special charcters and spaces from each string, and adds Button to the end of each string.
function makeArrId(array, outputArray, counter){
  outputArray.push(array[counter]);
  outputArray[counter] = outputArray[counter].replace(/\s/g,'').replace(/'/g,'').replace(/!/g,'').replace(/,/g,'')
	outputArray[counter] += "Button";
};
//function that adds 
function makeInputId(input, outputArray,counter){
  outputArray.push(input);
  outputArray[counter] = outputArray[counter].replace(/\s/g,'').replace(/'/g,'').replace(/!/g,'').replace(/,/g,'')
  outputArray[counter] += "Button";
};
//function that makes a url of the counter-th string of array in ouputArr, removes spaces and replaces them with a + and removes special characters.
function makeArrURL(array, outputArray, counter){
  outputArray.push(array[counter]);
  outputArray[counter] = outputArray[counter].replace(/\s/g,'+').replace(/'/g,'').replace(/!/g,'').replace(/,/g,'')
};

function makeInputURL(input, outputArray, counter){
  outputArray.push(input);
  outputArray[counter] = outputArray[counter].replace(/\s/g,'+').replace(/'/g,'').replace(/!/g,'').replace(/,/g,'')
};

//function that creates buttons using the input 
function makeButton(buttonName, idName, urlName){
	inputBtn = $("<button />").html(buttonName).attr("id", idName).attr("url", urlName);
};

//create a function that appends content to an html div by ID
function moveButton(btnParam){
	$("#button-container").append(btnParam);
};


addInitialButtons();
//create a function that stores user input on button click
$(document).on("click", "#addCartoon", function(e) {
  e.preventDefault();
	inputBtn = $("#cartoon-input").val();
  addInputButtons();
  $("#cartoon-form")[0].reset();
});
//dynamically displays 10 GIFs on the page when the button is clicked
$(document).on("click", "button", function() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("url") + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done(function(response){
      var results = response.data;
      console.log(results);
      // Looping over every result item
      for (var j = 0; j < results.length; j++) {

        //conditional statement that doesnt allow for unfit ratings for children
        if (results[j].rating !== "pg-13"  && results[j].rating !== "r") {
          //storing the selector the cartons id in the var gif div for later use
          var cartoonDiv = $("#cartoons");

          // Storing the result item's rating
          var rating = results[j].rating;

          //storing the text of the rating in a paragraph element and storing that content in a var for later use
          var p = $("<p>").text("Rating: " + rating);
          var animated = results[j].images.fixed_height.url;
          var still = results[j].images.fixed_height_still.url;
          // Creating an image tag with all of the attributes to allow for click function
          var cartoonImage = $("<img>");
          cartoonImage.attr("src", still);
          cartoonImage.attr("data-still", still);
          cartoonImage.attr("data-animate", animated);
          cartoonImage.attr("data-state", "still");
          cartoonImage.addClass("cartoonImage");
          //assigns the fixed_height.url in the carton image attr.
          cartoonImage.attr("src", results[j].images.fixed_height.url);
          //prepends the images to the var cartoonDiv.]
          cartoonDiv.prepend(p);
          cartoonDiv.prepend(cartoonImage);

        };
      };
    });
  });
  $(document).on("click", ".cartoonImage", function() {
    //stores the clicked on images data-state in the state variable
    var state = $(this).attr("data-state");
    //creates a condition if the image state is still, and the image is clicked, to switch the state to data-animate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    //creates a swtich condition that allows for the data-state to be set to still if the image is in any other state than still (defaultly animate)
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});