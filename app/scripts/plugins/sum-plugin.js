define(['bower_components/assemblyjs/dist/promises.js'], function( Promises ) {

  function _sum(a, b) {
      var promise = new Promises.Promise(function(resolve, reject) {
        if (a < 10) {
          setTimeout(function () { resolve(a + b) }, 100);
        }
        else {
          reject('a must be  < 10');
        }
      });

      return promise;
  }

  SumPlugin = {
    sum: _sum,
  }

  return SumPlugin;
});
