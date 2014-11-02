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
    api: {
      schema: 'http',
      host: 'wildfly8-testprova.rhcloud.com',
      port: '80',
      contexts: ['sitemanager', 'rest', 'svc', 'unicredit', 'gcio', 'sitemanager', '{serviceId}'],
      services: {
        login: {
          create: {
            method: 'POST',
            params: {
              serviceId: {'type': 'path', 'value': 'j_security_check'},
              j_username: {'type': 'body'},
              j_password: {'type': 'body'},
              submitButton: {'type': 'body', 'value': 'LOGIN'}
            },
            consume: 'application/x-www-form-urlencoded',
            produce: 'application/json'
          }
        },
        application: {
          readAll: {
            method: 'GET',
            params: {
              serviceId: {'type': 'path', 'value': 'application'}
            },
            produce: 'application/json'
          },
          search: {
            method: 'GET',
            params: {
              serviceId: {'type': 'path', 'value': 'application'}
            },
            produce: 'application/json'
          },
          readById: {
            method: 'GET',
            path: ['{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'application'},
              id: {'type': 'path'}
            },
            produce: 'application/json'
          },
          read: {
            method: 'GET',
            path: ['{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'application'},
              id: {'type': 'path', 'ref': 'data.id'}
            },
            consume: 'application/json',
            produce: 'application/json'
          },
          create: {
            method: 'POST',
            params: {
              serviceId: {'type': 'path', 'value': 'application'},
              data: {'type': 'body'}
            },
            consume: 'application/json',
            produce: 'application/json'
          },
          update: {
            method: 'PUT',
            path: ['{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'application'},
              id: {'type': 'path'},
              data: {'type': 'body'}
            },
            consume: 'application/json',
            produce: 'application/json'
          },
          remove: {
            method: 'DELETE',
            path: ['{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'application'},
              id: {'type': 'body', 'ref': 'data.id'}
            },
            produce: 'application/json'
          },
          removeById: {
            method: 'DELETE',
            path: ['{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'application'},
              id: {'type': 'path'},
            },
            consume: 'application/json',
            produce: 'application/json'
          }
        },
        page: {
          readAll: {
            method: 'GET',
            path: ['{applicationId}', '{variantId}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'}
            },
            produce: 'application/json'
          },
          search: {
            method: 'GET',
            path: ['{applicationId}', '{variantId}', '{page}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              page: {'type': 'path'}
            },
            produce: 'application/json'
          },
          readById: {
            method: 'GET',
            path: ['{applicationId}', '{variantId}', '{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              id: {'type': 'path'}
            },
            produce: 'application/json'
          },
          read: {
            method: 'GET',
            path: ['{applicationId}', '{variantId}', '{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              data: {'type': 'body'}
            },
            consume: 'application/json',
            produce: 'application/json'
          },
          create: {
            method: 'POST',
            path: ['{applicationId}', '{variantId}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              data: {'type': 'body'}
            },
            consume: 'application/json',
            produce: 'application/json'
          },
          update: {
            method: 'PUT',
            path: ['{applicationId}', '{variantId}', '{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              id: {'type': 'path'},
              data: {'type': 'body'}
            },
            consume: 'application/json',
            produce: 'application/json'
          },
          remove: {
            method: 'DELETE',
            path: ['{applicationId}', '{variantId}', '{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              data: {'type': 'body'}
            },
            produce: 'application/json'
          },
          removeById: {
            method: 'DELETE',
            path: ['{applicationId}', '{variantId}', '{id}'],
            params: {
              serviceId: {'type': 'path', 'value': 'pages'},
              applicationId: {'type': 'path'},
              variantId: {'type': 'path'},
              data: {'type': 'body'}
            },
            consume: 'application/json',
            produce: 'application/json'
          }
        },
        menu: {
          mock: '/json/{serviceId}/{operationId}/{method}-{applicationId}-{variantId}-{name}.json',
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
    },
    apiMocks: {
      schema: 'http',
      host: 'localhost',
      port: '3000',
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
