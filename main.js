$(document).ready(function() {

  $('#single-play-button').on("click", clickHandler);


  // play single song click handler
  function clickHandler(event){
    event.preventDefault();
    var result = prompt("Enter a song");
      console.log("User entered: " + result);
    var result2=parseNote(result);
      console.log("After calling parseNote, we get: " + result2);
    var parsedSong=parseSong(result);
    console.log("After calling parseSong, we get: " + parsedSong);
    $(this).html("Playing...");
    $(this).attr("Disabled", true);
    playSong(parsedSong, 400, donePlaying);

  }

  // playsong - callback function
  function donePlaying(){
    $("#single-play-button").html("Play Single Song");
    $("#single-play-button").attr("Disabled", false);
  }


  // when form is submitted
  $('#song-form').submit(function(event){
    event.preventDefault();
    var usersong=$('input[name="notes"]').val();
    if (usersong){
      console.log(usersong);
      $('#song-queue').append('<li>'+usersong+'</li>');
      $('input[name="notes"]').val(" ");
    }
    else{
      alert("You didnt enter a song");
        }
      
  });


  // when play all button is clicked
  $('#play-button').click(function(){

    $(this).slideUp();

    var num_of_songs = parseInt($('#song-queue').children().length,10);
        console.log(num_of_songs);
      // for (var i=0;i<num_of_songs;i++){
        var first_song=$('#song-queue').children().first().html();
        console.log(first_song);
        var parsed=parseSong(first_song);
        playSong(parsed, 400, songDone);
      // }
        
      
  });


  // // call back for when song is done playing
  // // remove the song from dom
  songDone = function(){
    $('#song-queue').children().first().remove();
    $('#play-button').slideDown();
  };


});