import fetch from 'node-fetch';
import FormData from 'form-data';
import { stringify } from 'querystring';
import { validateClassArguments, validateFetchArguments } from './validate';

/** Wrike.com API wrapper class. */
export default class Wrike {
  /**
   * Create a new Wrike instance.
   * @param {string} accessToken
   * @param {string} [apiRegion=us] Either 'us' or 'eu'.
   * @param {number} [apiVersion=4]
   */
  constructor(accessToken, apiRegion = 'us', apiVersion = 4) {
    validateClassArguments(accessToken, apiRegion, apiVersion);

    this.accessToken = accessToken;
    this.baseUrl = `https://${apiRegion === 'eu' ? 'app-eu' : 'www'}.wrike.com/api/v${apiVersion}`;
  }

  /**
   * Global fetch for each request method.
   * @async
   * @param {string} method Either 'get', 'post', 'put' or 'delete'.
   * @param {string} path E.g. '/tasks'.
   * @param {object} [parameters] Optional API parameters.
   * @returns {Promise} Resolves to an array, or a Node.js Readable stream (for downloads).
   */
  async fetch(method, path, parameters) {
    validateFetchArguments(method, path, parameters);

    const headers = { Authorization: `bearer ${this.accessToken}` };
    let url = `${this.baseUrl}${path}`;
    let body = null;

    if (parameters && parameters.file && parameters.name && parameters.contentType) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
      headers['Content-Type'] = parameters.contentType;
      headers['X-File-Name'] = parameters.name;
      body = parameters.file;
    } else if (method === 'get') {
      url += `?${stringify(parameters)}`;
    } else {
      body = new FormData();
      Object.keys(parameters).forEach(key => body.append(key, parameters[key]));
    }

    const response = await fetch(url, { method, headers, body });

    if (/^\/attachments\/[^/]+\/(?:download|preview)/.test(path)) {
      return response.body;
    }

    const result = await response.json();

    if (result.errorDescription) {
      throw new Error(`Wrike API: ${result.errorDescription}`);
    }

    return result.data;
  }

  /**
   * Send a GET request to the Wrike API.
   * @async
   * @param {string} path Wrike API method path, e.g. '/tasks'.
   * @param {object} [parameters] Optional Wrike API parameters.
   * @returns {Promise} Resolves to an array, or a Node.js Readable stream (for downloads).
   */
  get(path, parameters) {
    return this.fetch('get', path, parameters);
  }

  /**
   * Send a POST request to the Wrike API.
   * @async
   * @param {string} path Wrike API method path, e.g. '/tasks'.
   * @param {object} [parameters] Optional Wrike API parameters.
   * @returns {Promise} Resolves to an array, or a Node.js Readable stream (for downloads).
   */
  post(path, parameters) {
    return this.fetch('post', path, parameters);
  }

  /**
   * Send a PUT request to the Wrike API.
   * @async
   * @param {string} path Wrike API method path, e.g. '/tasks'.
   * @param {object} [parameters] Optional Wrike API parameters.
   * @returns {Promise} Resolves to an array, or a Node.js Readable stream (for downloads).
   */
  put(path, parameters) {
    return this.fetch('put', path, parameters);
  }

  /**
   * Send a DELETE request to the Wrike API.
   * @async
   * @param {string} path Wrike API method path, e.g. '/tasks'.
   * @param {object} [parameters] Optional Wrike API parameters.
   * @returns {Promise} Resolves to an array, or a Node.js Readable stream (for downloads).
   */
  delete(path, parameters) {
    return this.fetch('delete', path, parameters);
  }
}
