$(function() {
  try {
    Typekit.load();
  }
  catch(e) {}

  $('.content-holder').waypoint({
      handler: function(direction){
         if (direction === "down") {
            $('header').addClass('minimize')
          }else{
            $('header').removeClass('minimize')
            }
        },
        continuous: false

  });


});