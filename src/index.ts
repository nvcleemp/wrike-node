import nodeFetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { stringify } from 'querystring';

type Region = 'us'|'eu';
type Method = 'get'|'post'|'put'|'delete';
type Parameters = {
  file: string|Buffer|Blob|NodeJS.ReadableStream,
  contentType: string,
  name: string,
};

/** Wrike.com API wrapper class. */
export default class Wrike {
  private baseUrl: string;

  constructor(private accessToken: string, apiRegion: Region = 'us', apiVersion = 4) {
    this.baseUrl = `https://${apiRegion === 'eu' ? 'app-eu' : 'www'}.wrike.com/api/v${apiVersion}`;
  }

  private async fetch(
    method: Method,
    path: string,
    parameters?: Parameters): Promise<object[]|NodeJS.ReadableStream> {
    const headers: any = { Authorization: `bearer ${this.accessToken}` };
    let url = /^\//.test(path) ? `${this.baseUrl}${path}` : `${this.baseUrl}/${path}`;
    let body: any = null;

    if (parameters) {
      if (parameters.file && parameters.contentType && parameters.name) {
        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers['Content-Type'] = parameters.contentType;
        headers['X-File-Name'] = parameters.name;
        body = parameters.file;
      } else if (method === 'get') {
        url += `?${stringify(parameters)}`;
      } else {
        body = new URLSearchParams();

        Object.keys(parameters)
          .forEach((key) => {
            const paramKey = key as keyof Parameters;

            body.append(key, typeof parameters[paramKey] !== 'string'
              ? JSON.stringify(parameters[paramKey])
              : parameters[paramKey]);
          });
      }
    }

    const response = await nodeFetch(url, { method, headers, body });

    if (/^\/?attachments\/[^/]+\/(?:download|preview)/.test(path)) {
      return response.body;
    }

    const result = await response.json();

    if (result.errorDescription) {
      throw new Error(`Wrike API: ${result.errorDescription}`);
    }

    return result.data;
  }

  /** Send a GET request to the Wrike API. */
  get(path: string, parameters?: Parameters) {
    return this.fetch('get', path, parameters);
  }

  /** Send a POST request to the Wrike API. */
  post(path: string, parameters?: Parameters) {
    return this.fetch('post', path, parameters);
  }

  /** Send a PUT request to the Wrike API. */
  put(path: string, parameters?: Parameters) {
    return this.fetch('put', path, parameters);
  }

  /** Send a DELETE request to the Wrike API. */
  delete(path: string, parameters?: Parameters) {
    return this.fetch('delete', path, parameters);
  }
}

module.exports = Wrike;
