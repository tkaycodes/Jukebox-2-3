$(document).ready(function() {


  // PLAY SINGLE SONG BUTTON  ==============================
  $('#single-play-button').on("click", clickHandler);

  // play single song click handler
  function clickHandler(event)
  {
    event.preventDefault();

    var result = prompt("Enter a song");
    console.log("User entered: " + result);
    var trimmedresult = result.trim();

    // calling parseNote function 
    var result2=parseNote(trimmedresult);
    console.log("After calling parseNote, we get: " + result2);

    // calling parseSong function
    var parsedSong=parseSong(trimmedresult);
    console.log("After calling parseSong, we get: " + parsedSong);
    $(this).html("Playing...");
    $(this).attr("Disabled", true);

    // calling playSong function
    playSong(parsedSong, 400, donePlaying);
  }

  // callback function for playSong
  function donePlaying()
  {
    $("#single-play-button").html("Play Single Song");
    $("#single-play-button").attr("Disabled", false);
  }





  // FORM IS SUBMITTED ==============================
  $('#song-form').submit(function(event)
  {
    event.preventDefault();
    var usersong=$('input[name="notes"]').val();
    var trimmed_usersong = usersong.trim();
    if (trimmed_usersong)
    {
      // console.log(trimmed_usersong);
      // append user input as li into list of songs
      $('#song-queue').append('<li>'+trimmed_usersong+'</li>');
      // clear input
      $('input[name="notes"]').val(" ");
    }
    else
    {
      // if empty input and user clicked submit
      alert("You didnt enter a song");
    }
  });




  // PLAY-ALL BUTTON CLICKED ====================================
  $('#play-button').on("click", handlePlayAll);

  function handlePlayAll () {

    // if there are songs in the list
    if ($('#song-queue').children().length > 0)
    {
    $('#play-button').slideUp();

    console.log($($('#song-queue')).children().html());

    var first_song=$('#song-queue').children().first().html();
    console.log(first_song);
    var parsed=parseSong(first_song);
    playSong(parsed, 400, songDone);

    // }

    }
    else
    {
      // if no songs in list
      $('#play-button').slideDown();
    }

  }

  //call back for when song is done playing, remove the song from dom
  songDone = function(){
    $('#song-queue').children().first().remove();
    handlePlayAll();
  };


});