//put document.ready in JUST the ones with the onclicks (client-side)
$(document).ready(function(){

// // Grab the articles as a json
// $.getJSON("/articles", function (data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
//   }
// });

$(document).on("click", ".homeButton", function(){
  location.href="/"
})

// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);

    });
});

//when you click SCRAPE NEW ARTICLES
$(document).on("click", ".scrapeArticlesButton", function() {
  $.get("/scrape").then(function(data){
    location.reload();
    console.log("scrape success!")
    //tell javascript to auto reload the page
  }).catch(err => console.log(err));
});

//THIS CLEARS ARTICLES
$(document).on("click", ".clearArticlesButton", function() {
  $.ajax({
    method: "DELETE",
    url: "/api/clearArticles"
}).then(function(results){
  location.reload();
})
})
//when you click SAVE THIS ARTICLE 
$(document).on("click", ".saveArticleButton", function () {
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
console.log(thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "PUT",
    url: "/api/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
    });
});

//when you click ADD NOTE
$(document).on("click", ".addNoteButton", function(){
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  console.log(title);
  $(".modal-title").html(title);
  $("#articleId").html(id)

})

//when you click SAVE NOTE
$(document).on("click", ".saveNote", function(){
  //all text boxes are .val which refers to what is put INTO the text box
  console.log($("#articleId").html())
  var userNote =
  {
    title: $(".modal-title").text(),
    body: $("#userNote").val()
  }
  // MAKE A POST REQUEST THEN AN AJAX CALL 
  console.log("YOU HAVE THE RIGHT DATA", userNote);

})

//this sends the saved articles to saved.handlebars
$(document).on("click", ".savedArticles", function(){
  location.href="/saved"
})
// When you click the SAVE NOTE BUTTON
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
})
