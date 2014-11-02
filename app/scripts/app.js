/* global StateMachine, Grapnel, App, $, Zepto */


'use strict';

  window.assembly = {};

  function updateSplash(message) {
    $('.splash h3').html(message);
  }

  updateSplash('Uninstalled');

  console.log('app.js init', assembly);
  curl(['bower_components/assemblyjs/dist/assembly.js'])
    .then(function(assembly) {
      console.log('app.js [' + assembly.state() + ']');

      updateSplash('Installing...');

      console.log('app.js [1st then]', assembly);


      var plugins = [
        {id: 'jquery', type: 'plugin', source: 'scripts/plugins/jquery-plugin.js'},
        {id: 'logger', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/console-logger-plugin.js'},
        {id: 'utils', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/utilities-plugin.js'},
        {id: 'restRequest', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/rest-request.js'},
        {id: 'rest', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/rest.js'},
        {id: 'sumService', type: 'plugin', source: 'scripts/plugins/sum-plugin.js'},
        {id: 'ractive', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/ractive-plugin.js'},
        {id: 'grapnel', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/grapnel-plugin.js'},
        {id: 'mediator', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/mediator-plugin.js'},
        {id: 'restConfig', type: 'plugin', exportToSandbox: true, source: 'scripts/plugins/rest-cfg-plugin.js'},
      ];

      var modules = [
        {id: 'menu', type: 'module', source: 'scripts/modules/MenuModule.js'},
        {id: 'router', type: 'module', source: 'scripts/modules/RouterModule.js', config: {
            routes: {
              '/': assembly.noop,
              '/no-way': assembly.noop,
              '/ractiveExample': assembly.noop,
              '/jqueryExample' : assembly.noop,
            }
          }
        },
        {id: 'viewLoader', type: 'module', source: 'scripts/modules/ViewLoaderModule.js', privileged: true, config: {
            views: {
              '/': null,
              '/no-way': 'example3',
              '/ractiveExample': 'ractiveExample',
              '/jqueryExample': 'jqueryExample'
            }
          }
        },
        {id: 'ractiveExample', type: 'module', source: 'scripts/modules/Example1Module.js', autostart: false},
        {id: 'jqueryExample', type: 'module', source: 'scripts/modules/Example2Module.js', autostart: false},
        {id: 'example3', type: 'module', source: 'scripts/modules/Example3Module.js', autostart: false}
      ];

      modules = plugins.concat(modules);

      assembly.install(modules)
        .then(function(assembly) {

           updateSplash('Installed!');

           console.log('app.js [' + assembly + ']');
           console.log('app.js [' + assembly.state() + ']');

           console.log('Plugins loaded and ready');

           var sumService = assembly.plugins['sumService'].resolved;

           return sumService.sum(9, 15);
        })
        .then(function(result) {

           updateSplash('Starting...');

           console.log('sum(9, 15) = ', result);
           console.log('Starting Modules');
           return assembly.start(assembly.plugins, assembly.modules);
        })
        .then(function(assembly) {
           console.log('app.js [' + assembly.state() + ']');

           updateSplash('Started!');

           console.log('Modules loaded and ready');
           return assembly;
        })
        /*
        .then(function(assembly) {
           console.log('app.js [' + assembly.state() + ']');

           updateSplash('Stopping...');

           console.log('Stopping....');
           return assembly.stop(assembly.modules);
        })
        .then(function(assembly) {
           console.log('app.js [' + assembly.state() + ']');

           updateSplash('Uninstalling...');

           console.log('Uninstalling...');
           return assembly.uninstall();
        })
        .then(function(assembly) {

           updateSplash('Uninstalled!');

           console.log('app.js [' + assembly.state() + ']');
        })
        */
        .catch(function(reason) {
          console.error(reason);
        });

    });

