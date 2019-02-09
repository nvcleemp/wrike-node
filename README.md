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

#### `new Wrike(accessToken [, apiRegion = 'us', apiVersion = 4])`

Creates a new `Wrike` instance, authenticated by the provided access token.

- `accessToken` (String)
- _optional_ `apiRegion` (String) Either `'us'` or `'eu'`, used to determine the API base URL.
- _optional_ `apiVersion` (Integer)

#### `.get|post|put|delete(path [, parameters])`

Returns a `Promise`, resolving `data` (Array), or the full result.

- `path` (String) For possible values, see: https://developers.wrike.com/documentation
- _optional_ `parameters` (Object) For possible options, see https://developers.wrike.com/documentation

#### `.post|put(path, file, fileName)`

When uploading or replacing Wrike attachments, `parameters` becomes `file` content, and `fileName` is added.

- `path` (String) For possible values, see: https://developers.wrike.com/documentation
- `file` (String|Buffer|Blob|Readable stream)
- `fileName` (String) E.g. `'attachment.txt'`
