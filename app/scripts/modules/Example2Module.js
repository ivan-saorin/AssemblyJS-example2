define(['jquery','text!partials/example2/example2.html'], function( $, template ) {

  Example2Module = function (id, config, sandbox) {

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
      return id;
    }

    function _start() {
      $('#page-content').html(template);
      $('#answer').html('42');

    }

    function _stop() {
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

  return Example2Module;
});
