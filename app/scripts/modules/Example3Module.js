define(function(  ) {

  Example3Module = function (id, config, sandbox) {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    var logger = sandbox.logger;
    var promises = sandbox.promises;
    var utils = sandbox.utils;
    var mediator = sandbox.mediator;

    function _state() {
      return stateNames[current];
    }

    function _install(config) {
      var promise = new promises.Promise(function(resolve, reject) {

        logger.info('module', id, 'installed, config:', config);


        setTimeout(function () { resolve('installed') }, 500);
      });

      return promise;
    }

    function _start() {

      var promise = new promises.Promise(function(resolve, reject) {

        logger.info('module', id, 'started, config:', config);


        setTimeout(function () { resolve('active') }, 500);
      });

      return promise;
    }

    function _stop() {
      logger.info('module', id, 'stopped');
    }

    return {
      state: _state,
      install: _install,
      start: _start,
      stop: _stop//,
    };
  }

  return Example3Module;
});
