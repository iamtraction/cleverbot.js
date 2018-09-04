const request = require('request-promise-native');

/**
 * @class CleverbotIO
 */
class CleverbotIO {
  /**
  * @param {Object} options Options for initializing the cleverbot.js library.
  * @param {String} options.APIUser The Cleverbot API User.
  * @param {String} options.APIKey The Cleverbot API Key.
  * @example
  * const Cleverbot = require('cleverbot.js');
  * let options = {
  *   APIUser: 'aSflWCFDoi4F3BRpxXwe4faOFh2',
  *   APIKey: 'CFDoi4234falFOFaSfwepxXhBRW'
  * };
  * cleverbot = new Cleverbot(options);
  */
  constructor(options) {
    this.options = options && typeof options === 'object' ? options : {};

    if (!this.options.hasOwnProperty('APIUser') || !this.options.hasOwnProperty('APIKey')) {
      throw new Error('API User & Key are required to access the Cleverbot API. Get one at: https://www.cleverbot.io/keys');
    }
  }

  /**
   * Write a message to Cleverbot.
   * @function write
   * @param {String} message The message sent by the user.
   * @param {String} nick The bot session's nick.
   * @returns {String} The Cleverbot response object.
   * @example
   * cleverbot.write('Hi how\'re you?').then(response => {
   *   console.log(response.output); // Fine, How're you?
   * }).catch(e => {
   *   console.error(e);
   * });
   */
  async write(message, nick) {
    try {
      let options = {
        headers: {
          'User-Agent': 'cleverbot.js'
        },
        form: {
          user: this.options.APIUser,
          key: this.options.APIKey,
          nick: nick,
          text: message
        },
        json: true
      };

      let response = await request.post('https://cleverbot.io/1.0/ask', options);

      if (response.status === 'success') {
        response.output = response.response;
        delete response.response;
        return response;
      }
      return response;
    }
    catch (e) {
      if (e.statusCode) {
        let error = new Error();
        error.statusCode = e.response.statusCode;
        error.statusMessage = e.response.statusMessage;
        return error;
      }
      return e;
    }
  }

  /**
   * Create a bot session in Cleverbot.io.
   * @function init
   * @param {String?} nick The nick for the bot session.
   * @returns {String|null} The nick, if the session was successfully
   * initialized. `null` otherwise.
   * @example
   * cleverbot.init('k3rn31p4nic').then(response => {
   *   console.log(response); // true
   * }).catch(e => {
   *   console.error(e);
   * });
   */
  async init(nick) {
    try {
      let options = {
        headers: {
          'User-Agent': 'cleverbot.js'
        },
        form: {
          user: this.options.APIUser,
          key: this.options.APIKey,
          nick: nick
        },
        json: true
      };

      let response = await request.post('https://cleverbot.io/1.0/create', options);

      if (response.status === 'success') return response.nick;
      if (response.status.includes('reference name already exists')) return nick;
      return null;
    }
    catch (e) {
      if (e.statusCode) {
        let error = new Error();
        error.statusCode = e.response.statusCode;
        error.statusMessage = e.response.statusMessage;
        return error;
      }
      return e;
    }
  }
}

module.exports = CleverbotIO;
