$(document).ready(function() {


  // PLAY SINGLE SONG BUTTON  ==============================
  $('#single-play-button').on("click", clickHandler);

  // play single song click handler
  function clickHandler(event)
  {
    event.preventDefault();

    var result = prompt("Enter song note(s)");
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
    var songname=$('input[name="song_name"]').val();
    var trimmed_songname = songname.trim();
    var songnotes=$('input[name="notes"]').val();
    var trimmed_songnotes = songnotes.trim();
    if (trimmed_songnotes && trimmed_songname)
    {
      // console.log(trimmed_usersong);
      // append user input as li into list of songs
      $('#song-queue').append('<li data-songnotes="' +trimmed_songnotes+ '" data-songname="' +trimmed_songname+ '" data-toggle="tooltip" title="Song notes: '+ trimmed_songnotes +'"><strong>Song name:</strong> ' + trimmed_songname+ '</li>');
      $('li[data-toggle="tooltip"]').tooltip();

      $('input[name="song_name"]').val("").attr('placeholder', 'Enter song name(optional)');
      $('input[name="notes"]').val("").attr('placeholder', 'Enter song notes...');

    }
    else if (trimmed_songnotes){
      $('#song-queue').append('<li data-songnotes="' +trimmed_songnotes+ '" data-toggle="tooltip" title="Song notes: '+ trimmed_songnotes + '"><strong>Song name:</strong> (Didnt Specify)</li>');
      $('li[data-toggle="tooltip"]').tooltip();

      $('input[name="song_name"]').val("").attr('placeholder', 'Enter song name(optional)');
      $('input[name="notes"]').val("").attr('placeholder', 'Enter song notes...');

    }
    else
    {
      // if empty input and user clicked submit
      alert("You didnt enter any song notes");
    }
  });






  // PLAY-ALL BUTTON CLICKED ====================================
  $('#play-button').on("click", handlePlayAll);

  function handlePlayAll () {

    // if there are songs in the list
    if ($('#song-queue').children().length > 0)
    {
      $('#play-button').slideUp();
      // console.log($($('#song-queue')).children().html());
      var first_song=$('#song-queue').children().first().attr("data-songnotes");
      console.log(first_song);
      var parsed=parseSong(first_song);
      playSong(parsed, 400, songDone);
      $('#nowplaying').html('<strong>Now Playing: ' + $('#song-queue').children().first().attr("data-songname")   +'</strong>');
    }
    else
    {
      // if no songs in list
      alert("No Songs in Queue");
      $('#play-button').slideDown();
    }

  }

  //call back for playSong function
  songDone = function()
  {
    $('#song-queue').children().first().remove();
    $('#nowplaying').html("Enter a song to play");
    // recursively call setTimeout again after 1 second
    setTimeout(handlePlayAll ,1000);
  };






  // Space bar trigger playall songs

  $('body').keydown(function(event){
    var trigger = $(event.target);
    // if space bar pressed and event.target was not input 
    if (event.which === 32 && !trigger.is("input[class='form-control']"))
    {
      // console.log(trigger);
      // console.log(trigger == 'input');
      console.log("clicked spacebar");
      handlePlayAll();
    }
  });




});