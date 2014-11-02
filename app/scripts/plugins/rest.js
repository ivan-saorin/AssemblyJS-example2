define(['bower_components/assemblyjs/dist/promises.js', 'scripts/plugins/utilities-plugin.js'], function( Promises, Utils ) {

  var restValidationError = 'restService validation error: parameter ';
  var restValidationWarning = 'restService validation warning: parameter ';
  var restValidationErrorRequired = ' is required!';
  var restValidationErrorEmpty = ' cannot be empty!';
  var restValidationWarningFallback = ' cannot be empty in case data has value: falling back to default "application/json"';
  function callResource(config) {

    var promise = new Promises.Promise(function(resolve, reject) {

      if (!config) {
        throw new Error('restService validation error config is required!');
      }
      var method = config.method;
      var url = config.url;
      var produce = config.produce;
      var consume = config.consume;
      var data = config.data;
      var acceptedStatuses = config.acceptedStatuses;
      var dereference = config.dereference;
      var cache = config.cache;

      if (typeof method === 'undefined') {
        throw new Error(restValidationError +'"method"' + restValidationErrorRequired);
      }

      if (method === '') {
        throw new Error(restValidationError +'"method"' + restValidationErrorEmpty);
      }

      if (typeof url === 'undefined') {
        throw new Error(restValidationError +'"url"' + restValidationErrorRequired);
      }

      if (url === '') {
        throw new Error(restValidationError +'"url"' + restValidationErrorEmpty);
      }

      if (typeof data !== 'undefined') {
        if ((typeof consume === 'undefined') || (consume === '')) {
          console.log(restValidationWarning + '"consume"' + restValidationWarningFallback);
          consume = 'application/json';
        }
        if ((typeof produce === 'undefined') || (produce === '')) {
          console.log(restValidationWarning + '"produce"' + restValidationWarningFallback);
          produce = 'application/json';
        }
      }

      var minAcceptedStatus = -1;
      var maxAcceptedStatus = -1;
      var acceptedStatusValues = [];
      if (typeof acceptedStatuses === 'undefined') {
        acceptedStatuses = {'values': [200], 'range': [200, 299]};
        console.log(restValidationWarning + '"acceptedStatuses" cannot be empty: falling back to default: ', acceptedStatuses);
      }

      if (typeof acceptedStatuses.range !== 'undefined') {
        if ((!Array.isArray(acceptedStatuses.range)) || (acceptedStatuses.range.length !== 2)) {
          throw new Error('restService validation warning: when defined "acceptedStatuses.range" MUST be an array containing 2 values indicating the lower and upper bound!');
        }
        minAcceptedStatus = acceptedStatuses.range[0];
        maxAcceptedStatus = acceptedStatuses.range[1];
      }
      if (!Array.isArray(acceptedStatuses.values)) {
        console.log(restValidationWarning + '"acceptedStatuses.values" should be an array of accepted statuses: interpreting as single value, was: ', acceptedStatuses.values);
        acceptedStatusValues.push(acceptedStatuses.values);
      } else {
        acceptedStatusValues = acceptedStatuses.values;
      }

      if (typeof data !== 'undefined') {
        console.log('building promise for ReST call, method: ', method, ', url: ', url, ', consume: ', consume, ', data: ', data, ', produce: ', produce, ' acceptedStatuses: ', acceptedStatuses);
      } else {
        console.log('building promise for ReST call, method: ', method, ', url: ', url, ', produce: ', produce, ' acceptedStatuses: ', acceptedStatuses);
      }

      var myheaders = {};

      if (typeof data !== 'undefined') {
        myheaders['Content-Type'] = consume;
      }

      var resType = '';
      if (produce.indexOf('text') > -1) {
        resType = 'text';
      } else if (produce.indexOf('json') > -1) {
        resType = 'json';
      }

      if ((!cache) && (method === 'GET') && (resType === 'json')) {
        myheaders['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate';
        myheaders['Pragma'] = 'no-cache';
        myheaders['Expires'] = 'Fri, 01 Jan 1990 00:00:00 GMT';
        /*
        var ts = new Date().getTime();
        if (url.indexOf('?') > -1) {
          url = url + '&';
        }
        else {
          url = url + '?';
        }
        url = url + 'nocache=' + ts;
        */
      }

      var evaluateAcceptedStatusValues = (acceptedStatusValues.length > 0);
      var evaluateAcceptedStatusRange =  ((minAcceptedStatus > -1) && (maxAcceptedStatus > -1));

      $.ajax({
        type: method,
        url: url,
        // data to be added to query string:
        data: data,
        // type of data we are expecting in return:
        dataType: resType,
        headers: myheaders,
        cache: cache,
        timeout: 5000,
        success: function (data, status, headers, config) {
          var accepted = false;
          if (evaluateAcceptedStatusRange) {
            accepted = (headers.status >= minAcceptedStatus && headers.status <= maxAcceptedStatus);
          }
          if (evaluateAcceptedStatusValues) {
            for (var i = 0; i < acceptedStatusValues.length; i++) {
              if (('' + headers.status) === ('' + acceptedStatusValues[i])) {
                accepted = true;
                break;
              }
            }
          }

          if (accepted) {

            if (typeof dereference === 'undefined') {
              resolve(data);
            } else {

              try {
                var result = dereferenceFunction(data, dereference);

                resolve(result);
              } catch (e) {
                reject('Unable to dereference [' + dereference + '] with current response: ' + data);
              }

            }
          } else {
              reject(status + ' - Unexpected status code.');
            }
        },
        error: function (data, status/*, headers, config*/) {
          // called asynchronously if an error occurs or server returns response with an error status.
          reject({ data : data, status : status });
        }
      });
    });
    return (promise);
  }


  return ({
    callResource: callResource
  });
});
