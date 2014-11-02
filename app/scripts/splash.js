(function ( $ ) {
    curl({
        baseUrl: '.',
        paths: {
            curl: 'bower_components/curl/dist/curl/curl.js',
            text: 'bower_components/curl/src/curl/plugin/text.js',
            _fetchText: 'bower_components/curl/src/curl/plugin/_fetchText.js',
            js: 'bower_components/curl/src/curl/plugin/js.js',
            RSVP: 'bower_components/rsvp/rsvp.amd',
            jquery: 'bower_components/jquery/dist/jquery.min',
        }
    });

    $( document ).ready(function() {
        if($(".splash").is(":visible"))
        {
            $(".wrapper").css({"opacity":"0"});
        }
        $(".splash-arrow").click(function()
        {
            $(".splash").slideUp("300", function() {
                  $(".container").delay(100).animate({"opacity":"1.0"},300);
             });
        });
    });

    $(window).scroll(function() {
          $(window).off("scroll");
          $(".splash").slideUp("800", function() {
              $("html, body").animate({"scrollTop":"0px"},100);
              $(".container").delay(100).animate({"opacity":"1.0"},800);
         });
     });
})(jQuery);
