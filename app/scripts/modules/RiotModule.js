define(['scripts/modules/RiotTest.js'], function( tagjs ) {

  RiotModule = function (id, config, sandbox) {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    var logger = sandbox.logger;
    var promises = sandbox.promises;
    var utils = sandbox.utils;
    var mediator = sandbox.mediator;

    var riot = sandbox.riot;

    function _state() {
      return stateNames[current];
    }

    function _install(config) {
      return id;
    }

    function _start() {

      $('#page-content').html('<todo></todo>');

      riot.mount('todo', {
        title: 'I want to behave!',
        items: [
          { title: 'Avoid excessive coffeine', done: true },
          { title: 'Hidden item', hidden: true },
          { title: 'Be less provocative' },
          { title: 'Be nice to people' }
        ]
      });

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

  return RiotModule;
});
