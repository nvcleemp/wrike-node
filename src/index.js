import fetch from 'node-fetch';
import { stringify, unescape } from 'querystring';

export default class Wrike {
  constructor(accessToken, apiRegion = 'us', apiVersion = 4) {
    this.accessToken = accessToken;
    this.baseUrl = `https://${apiRegion === 'eu' ? 'app-eu' : 'www'}.wrike.com/api/v${apiVersion}`;
  }

  async fetch(method, path, parameters, fileName) {
    const headers = { Authorization: `bearer ${this.accessToken}` };
    let url = `${this.baseUrl}${path}`;
    let body = null;

    if (fileName) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
      headers['Content-Type'] = 'application/octet-stream';
      headers['X-File-Name'] = fileName;
      body = parameters;
    } else if (method === 'get') {
      url += `?${stringify(parameters)}`;
    } else {
      body = unescape(stringify(parameters));
    }

    const response = await fetch(url, { method, headers, body });
    const result = await response.json();
    return result.data || result;
  }

  get(path, parameters) {
    return this.fetch('get', path, parameters);
  }

  post(path, parameters, fileName) {
    return this.fetch('post', path, parameters, fileName);
  }

  put(path, parameters, fileName) {
    return this.fetch('put', path, parameters, fileName);
  }

  delete(path, parameters) {
    return this.fetch('delete', path, parameters);
  }
}
