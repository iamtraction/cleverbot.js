const qs = require('querystring');
const got = require('got');

/**
 * @class Cleverbot
 */
class Cleverbot {
  /**
  * @param {Object} options Options for initializing the cleverbot.js library.
  * @param {APIKey} options.APIKey The Cleverbot API Key.
  * @param {Boolean} options.preserveState Whether to preserve the state of the
  * conversations.
  * @example
  * const Cleverbot = require('cleverbot.js');
  * let options = {
  *   APIKey: 'CFDoi4234falFOFaSfwepxXhBRW',
  *   preserveState: true
  * };
  * cleverbot = new Cleverbot(options);
  */
  constructor(options) {
    this.options = options && typeof options === 'object' ? options : {};

    if (!this.options.hasOwnProperty('APIKey')) {
      throw new Error('An API Key is required to access the Cleverbot API. Get one at: https://www.cleverbot.com/api/');
    }
  }

  /**
   * Generates the path for the API request for the given messaage from user.
   * @function _getPath
   * @param {String} message The message sent by the user.
   * @returns {String} The path of the API request.
   */
  _getPath(message) {
    let endpoint = '/getreply';
    let query = {
      input: JSON.stringify(message || ''),
      key: this.options.APIKey
    };

    if (this.options.preserveState && this._state) {
      query.cs = this._state;
    }

    return [ endpoint, qs.stringify(query) ].join('?');
  }

  /**
   * Generates the path for the API request for the given messaage from user.
   * @function _getPath
   * @param {String} message The message sent by the user.
   * @returns {String} The Cleverbot response object.
   * @example
   * cleverbot.write('Hi how\'re you?').then(response => {
   *   console.log(response.output); // Fine, How're you?
   * }).catch(e => {
   *   console.error(e);
   * });
   */
  async write(message) {
    try {
      let options = {
        host: 'www.cleverbot.com',
        path: this._getPath(message),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'cleverbot.js'
        }
      };

      let response = await got(options);
      if (response) {
        if (response.statusCode === 200) {
          response.body = JSON.parse(response.body);

          if (this.options.preserveState) {
            this._state = response.body.cs;
          }

          return response.body;
        }
        let error = new Error();
        error.statusCode = response.statusCode;
        error.statusMessage = response.statusMessage;
        return error;
      }
    }
    catch (e) {
      if (e.statusCode) {
        let error = new Error();
        error.statusCode = e.statusCode;
        error.statusMessage = e.statusMessage;
        return error;
      }
      return e;
    }
  }
}

module.exports = Cleverbot;
