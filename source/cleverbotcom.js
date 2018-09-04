const qs = require('querystring');
const request = require('request-promise-native');

/**
 * @class CleverbotCOM
 */
class CleverbotCOM {
  /**
  * @param {Object} options Options for initializing the cleverbot.js library.
  * @param {String} options.APIKey The Cleverbot API Key.
  * @param {Boolean} options.preserveState Whether to preserve the state of the
  * conversations.
  * @example
  * const Cleverbot = require('cleverbot.js');
  * const options = {
  *   APIKey: 'CFDoi4234falFOFaSfwepxXhBRW',
  *   preserveState: true
  * };
  * const cleverbot = new Cleverbot.com(options);
  */
  constructor(options) {
    this.options = options && typeof options === 'object' ? options : {};

    if (!this.options.hasOwnProperty('APIKey')) {
      throw new Error('An API Key is required to access the Cleverbot API. Get one at: https://www.cleverbot.com/api/');
    }
  }

  /**
   * Generates the path for the API request for the given message from user.
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
   * Write a message to Cleverbot.
   * @function write
   * @param {String} message The message sent by the user.
   * @returns {String} The Cleverbot response object.
   * @example
   * cleverbot.write('Hi how\'re you?').then(response => {
   *   console.log(response.output); // Fine, how're you?
   * }).catch(e => {
   *   console.error(e);
   * });
   */
  async write(message) {
    try {
      let url = `https://www.cleverbot.com${this._getPath(message)}`;
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'cleverbot.js'
        }
      };

      let response = await request(url, options);
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

module.exports = CleverbotCOM;
