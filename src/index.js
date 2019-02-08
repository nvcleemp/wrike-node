import fetch from 'node-fetch';
import { stringify } from 'querystring';

export default class Wrike {
  constructor(accessToken, apiRegion = 'us', apiVersion = 4) {
    this.accessToken = accessToken;
    this.baseUrl = `https://${apiRegion === 'eu' ? 'app-eu' : 'www'}.wrike.com/api/v${apiVersion}`;
  }

  async fetch(method, path, parameters) {
    const response = await fetch(`${this.baseUrl}${path}?${stringify(parameters)}`, {
      headers: { Authorization: `bearer ${this.accessToken}` },
      method,
    });

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
