/*!
 * based on code in: https://github.com/mehdishojaei/mediator
*/
define(['bower_components/assemblyjs/dist/promises.js'], function( Promises ) {

	var _isArray = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},

	Mediator = function () {
		var mediator = {},
			cache = {};

		// Returns a promise of all the promises returned from subscribers callbacks.
		// If a promise fails, the result promise will not be reject and continue waiting
		// for other promises.
		// The result promise will be resolve if the return promises of all the
		// subscribers resolves, and reject otherwise.
		mediator.publish = function (channel) {

      var that = this,
          promises = 0,
          finishedPromises = 0,
          faileds = 0,
          subscribers = cache[channel],
          args = Array.prototype.slice.call(arguments, 1);

      var promise = new Promises.Promise(function(resolve, reject) {

        if (subscribers) {
          var checkFinished = function () {
            ++finishedPromises;

            // Continue on failure
            if (finishedPromises === promises) {
              if (faileds) {
                reject();
              } else {
                resolve();
              }
            }

            // Break on failure
            // if (faileds) {
            // 	deferred.reject();
            // } else if (finishedPromises === promises) {
            // 	deferred.resolve();
            // }
          },

          callbackFail = function () {
            ++faileds;
            checkFinished();
          };

          for (var i = 0, len = subscribers.length; i < len; i++) {
            var subscriber = subscribers[i],
              result = subscriber.callback.apply(subscriber.context || that, args.concat(channel));

            if (result === false) {
              break;
            }

            if (result && typeof result.then === 'function') {
              ++promises;
              result.then(checkFinished, callbackFail);
            }
          }
        }

        if (!promises) {
          resolve();
        }
      });


			return promise;
		};

		mediator.subscribe = function (channels, callback, context) {
			channels = _isArray(channels) ? channels : (channels.split(/\s+/) || []);

			for (var i = 0, len = channels.length; i < len; i++) {
				var channel = channels[i];

				if (!cache[channel]) {
					cache[channel] = [];
				}

				cache[channel].push({ callback: callback, context: context });
			}
		};

		mediator.unsubscribe = function (channels, callback) {
			var i, k, channelsLength, subscribersLength, channel, subscribers, newSubscribers;
			channels = _isArray(channels) ? channels : (channels.split(/\s+/) || []);

			for (i = 0, channelsLength = channels.length; i < channelsLength; i++) {
				channel = channels[i];

				if (!callback) {
					delete cache[channel];
					return;
				}

				subscribers = cache[channel];

				if (!subscribers) {
					throw 'Channel "' + channel + '" was not subscribed previously!';
				}

				newSubscribers = [];

				for (k = 0, subscribersLength = subscribers.length; k < subscribersLength; k++) {
					if (subscribers[k].callback !== callback) {
						newSubscribers.push(subscribers[k]);
					}
				}

				if (newSubscribers.length > 0) {
					cache[channel] = newSubscribers;
				} else {
					delete cache[channel];
				}
			}
		};

		return mediator;
	};

  return new Mediator();
});
