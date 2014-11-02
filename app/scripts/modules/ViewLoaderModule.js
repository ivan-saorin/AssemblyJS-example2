define(function(  ) {

  ViewLoaderModule = function (id, config, sandbox) {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    var logger = sandbox.logger;
    var promises = sandbox.promises;
    var utils = sandbox.utils;
    var mediator = sandbox.mediator;

    var views;
    var viewId = null;
    var modules;

    function stop(modules, moduleId) {
      var module = modules[moduleId].resolved;
      if (module) {
        return module.stop();
      }
    }

    function start(modules, moduleId) {
      var module = modules[moduleId].resolved;
      if (module) {
        return module.start();
      }
    }

    var routerBeforeRouteChange = function (currentRouteInfo, previousRouteInfo) {
      var args = arguments;
      var promise = new promises.Promise(function (resolve, reject) {
        logger.info('loader routerBeforeRouteChange:', currentRouteInfo, previousRouteInfo);
        if (currentRouteInfo.route === '/no-way') {
          reject('No preview allowed!');
        }
        else {
          resolve('OK');
        }
      });

      return promise;
    }

    var routerAfterRouteChange = function (currentRouteInfo, previousRouteInfo) {
      var args = arguments;
      var promise = new promises.Promise(function (resolve, reject) {
        logger.info('loader routerAfterRouteChange:', currentRouteInfo, previousRouteInfo);

        var returnPromises = [];
        for (var name in self.views) {
          if (self.views.hasOwnProperty(name)) {
            if (utils.isDefined(self.viewId)) {
              // stops the old view
              var m = stop(self.modules, self.viewId);
              if (utils.isDefined(m)) {
                returnPromises.push(m);
              }
            }


            var moduleId = self.views[name];
            if (utils.isDefined(moduleId) && (name === currentRouteInfo.params[0])) {
              self.viewId = moduleId;
              // start the new view
              var m = start(self.modules, self.viewId);
              if (utils.isDefined(m)) {
                returnPromises.push(m);
              }
              break;
            }
          }
        }

        if (returnPromises.length > 0) {
          resolve(promises.all(returnPromises));
        } else {
          resolve('OK');
        }
      });

      return promise;
    }

    function _state() {
      return stateNames[current];
    }

    /*being a privileged modules it receives the modules list in its install parameters */
    function _install(modules, config) {
      logger.info('module', id, 'installed, config:', config);

      self.views = config.views;
      self.modules = modules;

      return id;
    }

    function _start() {

      mediator.subscribe('router.before.routechange', routerBeforeRouteChange);
      mediator.subscribe('router.after.routechange', routerAfterRouteChange);

    }

    function _stop() {
      logger.warn('ViewLoaderModule stop', arguments);

      mediator.unsubscribe('router.before.routechange', routerBeforeRouteChange);
      mediator.unsubscribe('router.after.routechange', routerAfterRouteChange);

      self.views = null;
      self.modules = null;

    }

    return {
      state: _state,
      install: _install,
      start: _start,
      stop: _stop//,
    };
  }

  return ViewLoaderModule;
});
