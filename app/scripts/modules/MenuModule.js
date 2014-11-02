define(['text!partials/ractive/modules/menu.tpl'], function( menuTemplate ) {

  function apply(list) {
    list.hasItems = (list.items && list.items.length > 0);
    if (list.hasItems) {
      for (var i = 0; i < list.items.length; i++) {
        apply(list.items[i]);
      }
    }
  }


  MenuModule = function (id, config, sandbox) {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    var logger = sandbox.logger;
    var promises = sandbox.promises;

    function _state() {
      return stateNames[current];
    }

    function _install() {
      return id;
    }

    function _start() {
      var rest = sandbox.restRequest;

      var restConfig = sandbox.restConfig;

      var Ractive = sandbox.ractive;

      var Utils = sandbox.utils;

      /* Demonstrate the chaining of promises with two ajax calls as return of the start operation. */

      return rest.callResource(restConfig.apiMocks, {serviceId: 'menu', operation: 'list', applicationId: 'union', variantId: 'default'})
        .then(function (result) {
          logger.warn('Not useful.... this call was only for test porpouses... menu.list --->', result);
          return rest.callResource(restConfig.apiMocks, {serviceId: 'menu', operation: 'search', applicationId: 'union', variantId: 'default', name: 'main'})
        })
        .then(function (result) {
          result = result.items[0];

          apply(result);

          return result;
        })
        .then(function (result) {
          logger.warn('menu.search --->', result);

          var ractive = new Ractive({
              el: '#navbar-content',
              template: menuTemplate,
            data: result
          });

        });



    }

    function _stop() {
      logger.warn('Menu Module stop', arguments);
    }

    return {
      state: _state,
      install: _install,
      start: _start,
      stop: _stop//,
    };
  }

  return MenuModule;
});
