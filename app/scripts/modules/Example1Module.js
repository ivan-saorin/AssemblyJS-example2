define(['text!partials/example1/example1.html'], function( template ) {

  Example1Module = function (id, config, sandbox) {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    var logger = sandbox.logger;
    var promises = sandbox.promises;
    var utils = sandbox.utils;
    var mediator = sandbox.mediator;

    var ractive, interval;

    function _state() {
      return stateNames[current];
    }

    function _install(config) {
      /* Test to slow down the loading phase
      var promise = new promises.Promise(function(resolve, reject) {

        logger.info('module', id, 'installed, config:', config);


        setTimeout(function () { resolve('installed') }, 500);
      });

      return promise;
      */
      return id;
    }

    function _start() {

      ractive = new Ractive({
        el: '#page-content',
        template: template,
        data: {
          date: new Date(),
          days: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
          months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],

          // add suffix to numbers, e.g. 2 -> '2nd', 14 -> '14th'
          addSuffix: function ( num ) {
            // special case - any number ending with 10-19 is suffixed with 'th'
            if ( num % 100 >= 10 && num % 100 <= 19 ) {
              return num + 'th';
            }

            switch ( num % 10 ) {
              case 1: return num + 'st';
              case 2: return num + 'nd';
              case 3: return num + 'rd';
            }

            return num + 'th';
          },

          // ensure all numbers have two digits
          pad: function ( num ) {
            return ( num < 10 ? '0' + num : num );
          },

          // clock face markers - major (every 5 minutes) and minor (every minute)
          major: new Array( 12 ),
          minor: new Array( 60 )
        }
      });

      // ...then update it once a second
      interval = setInterval( function () {
        ractive.set( 'date', new Date() );
      }, 1000 );

    }

    function _stop() {
      ractive = null;
      clearInterval(interval);
      interval = null;
      $('#page-content').html('');

      logger.info('module', id, 'stopped');
    }

    return {
      state: _state,
      install: _install,
      start: _start,
      stop: _stop//,
    };
  }

  return Example1Module;
});
