define(['bower_components/assemblyjs/dist/promises.js', 'scripts/plugins/utilities-plugin.js', 'scripts/plugins/rest.js'], function( Promises, Utils, Rest ) {

  function urlTemplate(config) {
    var template = '';
    if (typeof config.schema === 'undefined')    {
      template += 'http://';
    }
    else {
      template += '{schema}://';
    }

    if (typeof config.host === 'undefined')    {
      template += 'localhost';
    }
    else {
      template += '{host}';
    }

    if (typeof config.port !== 'undefined')    {
      template += ':{port}';
    }

    if (typeof config.contexts !== 'undefined')    {
      console.log('Utils', Utils);
      console.log('config.contexts', config.contexts);
      if (Utils.isArray(config.contexts)) {
        for (var i = 0; i < config.contexts.length; i++) {
          template += '/' + config.contexts[i];
        }
      }
      else {
        template += config.contexts;
      }
    }

    return template;
  }

  //UrlTemplate implementation
  /**
  * @constructor
  */
  function UrlTemplate() {}
  /**
  * @private
  * @param {string} str
  * @return {string}
  */
  UrlTemplate.prototype.encodeReserved = function (str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
      if (!/%[0-9A-Fa-f]/.test(part)) {
        part = encodeURI(part);
      }
      return part;
    }).join('');
  };
  /**
  * @private
  * @param {string} operator
  * @param {string} value
  * @param {string} key
  * @return {string}
  */
  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : encodeURIComponent(value);
    if (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    } else {
      return encodeURIComponent(value);
    }
  };
  /**
  * @private
  * @param {*} value
  * @return {boolean}
  */
  UrlTemplate.prototype.isDefined = function (value) {
    return value !== undefined && value !== null;
  };
  /**
  * @private
  * @param {string}
  * @return {boolean}
  */
  UrlTemplate.prototype.isKeyOperator = function (operator) {
    return operator === ';' || operator === '&' || operator === '?';
  };
  /**
  * @private
  * @param {Object} context
  * @param {string} operator
  * @param {string} key
  * @param {string} modifier
  */
  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
    var value = context[key],
        result = [];
    if (this.isDefined(value) && value !== '') {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        value = value.toString();
        if (modifier && modifier !== '*') {
          value = value.substring(0, parseInt(modifier, 10));
        }
        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
      } else {
        if (modifier === '*') {
          if (Array.isArray(value)) {
            value.filter(this.isDefined).forEach(function (value) {
              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
            }, this);
          } else {
            Object.keys(value).forEach(function (k) {
              if (this.isDefined(value[k])) {
                result.push(this.encodeValue(operator, value[k], k));
              }
            }, this);
          }
        } else {
          var tmp = [];
          if (Array.isArray(value)) {
            value.filter(this.isDefined).forEach(function (value) {
              tmp.push(this.encodeValue(operator, value));
            }, this);
          } else {
            Object.keys(value).forEach(function (k) {
              if (this.isDefined(value[k])) {
                tmp.push(encodeURIComponent(k));
                tmp.push(this.encodeValue(operator, value[k].toString()));
              }
            }, this);
          }
          if (this.isKeyOperator(operator)) {
            result.push(encodeURIComponent(key) + '=' + tmp.join(','));
          } else if (tmp.length !== 0) {
            result.push(tmp.join(','));
          }
        }
      }
    } else {
      if (operator === ';') {
        result.push(encodeURIComponent(key));
      } else if (operator === '&' || operator === '?') {
        result.push(encodeURIComponent(key) + '=');
      } else if (value === '') {
        result.push('');
      }
    }
    return result;
  };
  /**
  * @param {string} template
  * @return {function(Object):string}
  */
  UrlTemplate.prototype.parse = function (template) {
    var that = this;
    var operators = ['+', '#', '.', '/', ';', '?', '&'];
    return {
      expand: function (context) {
        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (Utils, expression, literal) {
          if (expression) {
            var operator = null,
                values = [];
            if (operators.indexOf(expression.charAt(0)) !== -1) {
              operator = expression.charAt(0);
              expression = expression.substr(1);
            }
            expression.split(/,/g).forEach(function (variable) {
              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
            });
            if (operator && operator !== '+') {
              var separator = ',';
              if (operator === '?') {
                separator = '&';
              } else if (operator !== '#') {
                separator = operator;
              }
              return (values.length !== 0 ? operator : '') + values.join(separator);
            } else {
              return values.join(',');
            }
          } else {
            return that.encodeReserved(literal);
          }
        });
      }
    };
  };
  var _tpl = new UrlTemplate();

  function getValue(object, str) {
    var parts = str.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (Utils.isDefined(object[parts[i]])) {
        object = object[parts[i]];
      }
    }
    return object;
  }

  var restRequest = function config(globalConfig, requestConfig) {

    var promise = new Promises.Promise(function (resolve, reject) {


      var result = {};

      if (!Utils.isDefined(globalConfig)) {
        reject('Parameter \'globalConfig\' is undefined!');
        return (promise);
      }

      if (!Utils.isDefined(requestConfig)) {
        reject('Parameter \'requestConfig\' is undefined!');
        return (promise);
      }

      if (!Utils.isDefined(requestConfig.operation)) {
        reject('Parameter \'requestConfig.operation\' is undefined!');
        return (promise);
      }

      if (!Utils.isDefined(requestConfig.serviceId)) {
        reject('Parameter \'requestConfig.serviceId\' is undefined!');
        return (promise);
      }

      var found = false;
      var str = '';

      for (name in globalConfig.services) {
        if (globalConfig.services.hasOwnProperty(name)) {
          str = str + ',\'' + name + '\'';
          if (name === requestConfig.serviceId) {
            found = true;
          }
        }
      }

      if (!found) {
        str = str.substring(1);
        reject('Parameter \'requestConfig.serviceId\' must be one of: ' + str + '!');
        return (promise);
      }

      var config = globalConfig;//Utils.copy(globalConfig);

      if (!Utils.isDefined(config.urlParamsSeparator)) {
        config.urlParamsSeparator = '/';
      }

      found = false;
      str = '';

      for (name in config.services[requestConfig.serviceId]) {
        if (config.services[requestConfig.serviceId].hasOwnProperty(name)) {
          str = str + ',\'' + name + '\'';
          if (name === requestConfig.operation) {
            found = true;
          }
        }
      }

      if (!found) {
        str = str.substring(1);
        reject('Parameter \'requestConfig.operation\' must be one of: ' + str + '!');
        return (promise);
      }

      var service = config.services[requestConfig.serviceId][requestConfig.operation];

      if (!Utils.isDefined(service)) {
        reject('Cannot extract service from \'globalConfig\'.');
        return (promise);
      }

      if (!Utils.isDefined(service.method)) {
        reject('Cannot extract \'service.method\'.');
        return (promise);
      }

      service.serviceId = requestConfig.serviceId;
      service.operationId = requestConfig.operation;

      if (Utils.isUndefined(service.cache)) {
        service.cache = config.cache;
      }

      if (Utils.isDefined(service.cache)) {
        result.cache = service.cache;
      }

      if (Utils.isUndefined(service.produce)) {
        service.produce = config.produce;
      }

      if (Utils.isDefined(service.produce)) {
        result.produce = service.produce;
      }

      if (Utils.isUndefined(service.consume)) {
        service.consume = config.consume;
      }

      if (Utils.isDefined(service.consume)) {
        result.consume = service.consume;
      }

      if (Utils.isUndefined(service.schema)) {
        service.schema = config.schema;
      }

      if (Utils.isUndefined(service.host)) {
        service.host = config.host;
      }

      if (Utils.isUndefined(service.port)) {
        service.port = config.port;
      }

      if (Utils.isUndefined(service.contexts)) {
        service.contexts = config.contexts;
      }

      if (Utils.isUndefined(service.urlParamsSeparator)) {
        service.urlParamsSeparator = config.urlParamsSeparator;
      }



      var template = urlTemplate(service);

      if (Utils.isDefined(service.path)) {
        if (!Utils.isArray(service.path)) {
          reject('\'service.path\' must be an array of strings.');
          return (promise);
        }
        str = '';
        for (var i = 0; i < service.path.length; i++) {
          var sep = service.urlParamsSeparator;
          if (i === 0) {
            sep = '/';
          }

          str = str + sep + service.path[i];
          var sid = service.path[i].substring(1, service.path[i].length - 1);
          service[sid] = requestConfig[sid];
        }
        template = template + str;
      }

      var data = '';

      for (name in service.params) {
        if (service.params.hasOwnProperty(name)) {
          if (service.params[name].type === 'path') {
            if (Utils.isDefined(service.params[name].ref)) {
              var v = getValue(requestConfig, service.params[name].ref);
              config[name] = v;
              result[name] = v;
            }
            else if (Utils.isDefined(service.params[name].value)) {
              config[name] = service.params[name].value;
              result[name] = service.params[name].value;
            }
            else {
              var t = requestConfig[name];
              config[name] = t;
              result[name] = t;
            }
          } else if (service.params[name].type === 'body') {
            data = data + '&' + name + '=';
            if (Utils.isDefined(service.params[name].value)) {
              data = data + service.params[name].value;
            }
            else {
              var t = requestConfig[key];
              if (Utils.isObject(t)) {
                data = requestConfig[name];
              }
              else if (Utils.isArray(t)) {
                data = requestConfig[name];
              }
              else {
                data = data + t;
              }
            }
          }
        }
      }

      if (data !== '') {
        data = data.substring(1);
      }

      console.info('template:', template, 'service:', service);

      var url = _tpl.parse(template);
      var res = url.expand(service);
      while (res.charAt(res.length - 1) === '/') {
        res = res.substring(0, res.length - 1);
      }

      result.method = service.method;
      result.url = res;
      result.data = data;

      resolve(result);
    });

    return (promise);
  }

  function callResource(globalConfig, requestConfig) {
    return restRequest(globalConfig, requestConfig)
      .then(function (config) {
        return Rest.callResource(config);
      });
  }

  return ({
    create: restRequest,
    callResource: callResource
  });
});
