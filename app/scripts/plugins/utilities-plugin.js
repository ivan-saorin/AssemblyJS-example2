define(function( ) {

  UtilsPlugin = {

    /**
     * @name isUndefined

     * @kind function
     *
     * @description
     * Determines if a reference is undefined.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is undefined.
     */
    isUndefined: function(value) { return (typeof value === 'undefined' || value === null); },


    /**
     * @name isDefined

     * @kind function
     *
     * @description
     * Determines if a reference is defined.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is defined.
     */
    isDefined: function (value) { return (typeof value !== 'undefined' && value !== null); },


    /**
     * @name isObject

     * @kind function
     *
     * @description
     * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
     * considered to be objects. Note that JavaScript arrays are objects.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is an `Object` but not `null`.
     */
    isObject: function (value){
      // http://jsperf.com/isobject4
      return value !== null && typeof value === 'object';
    },


    /**
     * @name isString

     * @kind function
     *
     * @description
     * Determines if a reference is a `String`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `String`.
     */
    isString: function (value){return typeof value === 'string';},


    /**
     * @name isNumber

     * @kind function
     *
     * @description
     * Determines if a reference is a `Number`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Number`.
     */
    isNumber: function (value){return typeof value === 'number';},


    /**
     * @name isDate

     * @kind function
     *
     * @description
     * Determines if a value is a date.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Date`.
     */
    isDate: function (value) {
      return toString.call(value) === '[object Date]';
    },


    /**
     * @name isArray

     * @kind function
     *
     * @description
     * Determines if a reference is an `Array`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is an `Array`.
     */
    isArray: Array.isArray,

    /**
     * @name isFunction

     * @kind function
     *
     * @description
     * Determines if a reference is a `Function`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Function`.
     */
    isFunction: function (value){return typeof value === 'function';},


    /**
     * Determines if a value is a regular expression object.
     *
     * @private
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `RegExp`.
     */
    isRegExp: function (value) {
      return toString.call(value) === '[object RegExp]';
    },


    /**
     * Checks if `obj` is a window object.
     *
     * @private
     * @param {*} obj Object to check
     * @returns {boolean} True if `obj` is a window obj.
     */
    isWindow: function (obj) {
      return obj && obj.window === obj;
    },

    isFile: function (obj) {
      return toString.call(obj) === '[object File]';
    },


    isBlob: function (obj) {
      return toString.call(obj) === '[object Blob]';
    },

    isBoolean: function (value) {
      return typeof value === 'boolean';
    },


    isPromiseLike: function (obj) {
      return obj && this.isFunction(obj.then);
    },

    trim: function (value) {
      return isString(value) ? value.trim() : value;
    },


    /**
     * @name isElement
     * @kind function
     *
     * @description
     * Determines if a reference is a DOM element (or wrapped jQuery element).
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a DOM element (or wrapped jQuery element).
     */
    isElement: function (node) {
      return !!(node &&
        (node.nodeName  // we are a direct element
        || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
    }
  };



  return UtilsPlugin;
});
