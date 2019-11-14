$(document).ready(function () {
  console.log("ready!");
  
  $.getJSON("/articles", function (data) {

      for (var i = 0; i < data.length; i++) {
         

          if (data[i].photo === undefined) {
              i++;
          } else {
              $(".row").append('<div class="col-sm-6 col-md-4" data-id="' + data[i]._id + '"><div class="thumbnail"><a class="lightbox" target="_blank" href="' +
                  data[i].link + '"><img src="' + data[i].photo + '" alt="' + data[i].title +
                  '"></a><div class="caption"><h3>' + data[i].pubDate + ": " + data[i].title + '</h3>' +
                  '<p>' + data[i].desc + '</p><br>' +
                  '<div class="top-buttons"><button type="button" class="btn btn-primary" id="add-note" value="' + data[i]._id + '" data-toggle="modal" data-target="#notesModal">View/Add Notes</button></div>' +
                  '</div></div></div>')
              
          }
      }
  });
  $(document).on('click', '.btn', function () {
      var buttonid = $(this).attr('id');
      console.log(buttonid)
      if (buttonid === "add-note") {
          
          var thisId = $(this).attr("value");
          
          


          $.ajax({
              method: "GET",
              url: "/articles/" + thisId
          })
              
              .done(function (data) {
                  $("#modalTitle").text(data.title)
                  $("#save-note").attr("data-id", thisId);
                  $("#note-text").attr("data-id", thisId);

                 
                  if (data.note) {
                      
                      
                      $("#titleinput").html(data.note.title);
                     
                      $("#bodyinput").html(data.note.body);
                          
                      $("#note-text").attr("data-id", thisId).text("Your note was added at " + data.note.timestamp)
                  }
              });
      } else if (buttonid === "save-note") {

          var saveId = $(this).attr("data-id");
          console.log(saveId)
          
         
          $.ajax({
              method: "POST",
              url: "/articles/" + saveId,
              data: {
                 
                  title: $("#titleinput").val(),
                
                  body: $("#bodyinput").val(),
                  timestamp: Date.now()
              }
          })
      
              .done(function (data) {
                 
                  $("#note-text").attr("data-id", thisId).text("Your Note Was Saved")

                  
                  
              });

         
      }      
  });
});