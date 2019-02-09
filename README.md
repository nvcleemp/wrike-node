# Wrike API

> Node.js [Wrike.com API](https://developers.wrike.com/documentation) wrapper.

## Install

```shell
npm install --save wrike-node
```

## Usage

```js
const Wrike = require('wrike-node');
const wrike = new Wrike('<access_token>');

wrike
  .get('/tasks', { limit: 3 })
  .then(tasks => console.log(tasks));
```

## Reference

#### `new Wrike(accessToken[,apiRegion[,apiVersion]])`

Creates a new `Wrike` instance, authenticated by the provided access token.

- `accessToken` (String)
- `apiRegion` (String) Either `'us'` or `'eu'`, used to determine the API base URL. **Default: `'us'`**
- `apiVersion` (Integer) **Default: `4`**

#### `wrike.get|post|put|delete(path[,parameters])`

Returns a `Promise`, resolving `data` (Array), or the full result.

- `path` (String) For possible values, see: https://developers.wrike.com/documentation
- `parameters` (Object) For possible properties, see https://developers.wrike.com/documentation

##### Attachments

When uploading or replacing Wrike attachments, use the following `parameters`:

- `parameters.file` (String|Buffer|Blob|Readable stream) E.g. `'Hello world!'`
- `parameters.name` (String) E.g. `'attachment.txt'`
- `parameters.contentType` (String) E.g. `'text/plain'`
