import fetch from 'node-fetch';
import { stringify, unescape } from 'querystring';

export default class Wrike {
  constructor(accessToken, apiRegion = 'us', apiVersion = 4) {
    this.accessToken = accessToken;
    this.baseUrl = `https://${apiRegion === 'eu' ? 'app-eu' : 'www'}.wrike.com/api/v${apiVersion}`;
  }

  async fetch(method, path, parameters) {
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
      body = unescape(stringify(parameters));
    }

    const response = await fetch(url, { method, headers, body });
    const result = await response.json();
    return result.data || result;
  }

  get(path, parameters) {
    return this.fetch('get', path, parameters);
  }

  post(path, parameters) {
    return this.fetch('post', path, parameters);
  }

  put(path, parameters) {
    return this.fetch('put', path, parameters);
  }

  delete(path, parameters) {
    return this.fetch('delete', path, parameters);
  }
}
