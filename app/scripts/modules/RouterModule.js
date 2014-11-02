define(function(  ) {

  RouterModule = function (id, config, sandbox) {

    var self = this;

    var stateNames = ['uninstalled', 'installed', 'active'];

    var current = 0;

    var logger = sandbox.logger;
    var promises = sandbox.promises;
    var utils = sandbox.utils;

    var params;

    /* Not used in this moment
    function match (event) {
      var currentRouteInfo = self.router.state ? {
        route: self.router.state.route,
        value: self.router.state.value,
        params:  self.router.state.regex
      } : {};
      var previousRouteInfo;

      if (utils.isDefined(self.router.state) && utils.isDefined(self.router.state.previousState)) {
        previousRouteInfo = {
          route: self.router.state.previousState.route,
          value: self.router.state.previousState.value,
          params: self.router.state.previousState.regex
        };
      }

      sandbox.mediator.publish('router.match', currentRouteInfo, previousRouteInfo);
    }
    */

    function hashchange(event) {

      var currentRouteInfo = self.router.state ? {
        route: self.router.state.route,
        value: self.router.state.value,
        params:  self.router.state.regex
      } : {};

      var previousRouteInfo = (utils.isDefined(self.router.state) && utils.isDefined(self.router.state.previousState)) ? {
        route: self.router.state.previousState.route,
        value: self.router.state.previousState.value,
        params: self.router.state.previousState.regex
      } : {};

      sandbox.mediator.publish('router.before.routechange', currentRouteInfo, previousRouteInfo)
        .then(function() {

          sandbox.mediator.publish('router.after.routechange', currentRouteInfo, previousRouteInfo);

        }, function(reject) {
          self.router.anchor.reset();
          self.router.anchor.set(previousRouteInfo.params[0]);
          sandbox.mediator.publish('error.handler', currentRouteInfo.param[0], reject);
        });
    }


    function _state() {
      return stateNames[current];
    }

    function _install(config) {
      self.routes = config.routes;
      return id;
    }

    function _start() {

      var Grapnel = sandbox.grapnel;

      logger.info('module', id, 'started');

      self.router = Grapnel.listen(self.routes);

      //self.router.on('match', match);

      self.router.on('hashchange', hashchange);

      self.router.anchor.set('/');

    }

    function _stop() {
      module.router = null;
      logger.info('module', id, 'stopped');
    }

    return {
      state: _state,
      install: _install,
      start: _start,
      stop: _stop//,
    };
  }

  return RouterModule;
});
