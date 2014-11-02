define(function( ) {

  /*
    Shameless port of AngularJS logger.
    see: https://github.com/angular/angular.js/blob/master/src/ng/log.js
  */

  function consoleLog(type) {
    var console = window.console || {},
        logFn = console[type] || console.log || App.Noop,
        hasApply = false;



    // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
    // The reason behind this is that console.log has type "object" in IE8...
    try {
      hasApply = !!logFn.apply;
    } catch (e) {}

    if (hasApply) {
      return function() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        };
        return logFn.apply(console, args);
      };
    }

    // we are IE which either doesn't have window.console => this is noop and we do nothing,
    // or we are IE where console.log doesn't have apply so we log at least first 2 args
    return function(arg1, arg2) {
      logFn(arg1, arg2 == null ? '' : arg2);
    };
  };

  var logger = {
      /**
       * @name $logger#log
       *
       * @description logger
       * Write a log message
       */
      log: consoleLog('log'),

      /**
       * @name $logger#info
       *
       * @description
       * Write an information message
       */
      info: consoleLog('info'),

      /**
       * @name $logger#warn
       *
       * @description
       * Write a warning message
       */
      warn: consoleLog('warn'),

      /**
       * @name $logger#error
       *
       * @description
       * Write an error message
       */
      error: consoleLog('error'),

      /**
       * @name $logger#debug
       *
       * @description
       * Write a debug message
       */
      debug: (function () {
        var fn = consoleLog('debug');

        return function() {
          if (debug) {
            fn.apply(self, arguments);
          }
        };
      })()
  };

  return logger;
});
