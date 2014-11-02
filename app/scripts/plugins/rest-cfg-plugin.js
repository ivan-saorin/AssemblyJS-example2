define(['bower_components/assemblyjs/dist/promises.js'], function( Promises ) {

  var ApiConfig = {
    jsontest: {
      schema: 'http',
      port: 80,
      cache: true,
      produce: 'application/json',
      services: {
        ip: {
          get: {
            method: 'GET',
            host: 'ip.jsontest.com',
          }
        },
        datetime: {
          get: {
            method: 'GET',
            host: 'date.jsontest.com',
          }
        }
      }
    },
    apiMocks: {
      schema: 'http',
      host: 'localhost',
      port: '3001',
      contexts: ['scripts', 'json', '{serviceId}', '{operationId}'],
      urlParamsSeparator: '-',
      services: {
        menu: {
          list: {
            method: 'GET',
            path: ['{applicationId}', '{variantId}'],
            params: {
              serviceId: {'type': 'path', 'value': 'menu'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'}
            },
            produce: 'application/json'
          },
          search: {
            method: 'GET',
            path: ['{applicationId}', '{variantId}', '{name}'],
            params: {
              serviceId: {'type': 'path', 'value': 'menu'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              name: {'type': 'path'}
            },
            produce: 'application/json'
          }
        }
      }
    }
  };

  return ApiConfig;
});
