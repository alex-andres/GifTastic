$(function(){
// giffy API KEY: 4fGVtcP6gPr5FHXCp60Uj3sg0ymoaJ8Q

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
$("#addCartoon").click(function(e){
  e.preventDefault();
	inputBtn = $("#cartoon-input").val();
  addInputButtons();
  buttonClick();
  $("#cartoon-form")[0].reset();
});
function buttonClick(){
  $("button").click(function(){
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
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("#cartoons");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var cartoonImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          cartoonImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and cartoonImage we created to the "gifDiv" div we created
          gifDiv.prepend(p);
          gifDiv.prepend(cartoonImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        };
      };
    });
  });
  };
buttonClick();
});