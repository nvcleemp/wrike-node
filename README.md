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

### new Wrike(accessToken[, apiRegion[, apiVersion]])

* `accessToken` &lt;String&gt;
* `apiRegion` &lt;String&gt; Either `'us'` or `'eu'`. Used to determine the API base URL. **Default: `'us'`**
* `apiVersion` &lt;Integer&gt; **Default: `4`**

### wrike.get|post|put|delete(path[, parameters])

* `path` &lt;String&gt;
* `parameters` &lt;Object&gt; **Default: `undefined`**

_For all possible values, see: https://developers.wrike.com/documentation_

Always returns a `Promise`, resolving to either:

1. The result object's `data` property &lt;Array&gt;
2. The entire result object &lt;Object&gt; (when there's no `data` property)
3. A Node.js [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) (when downloading [attachments](https://developers.wrike.com/documentation/api/methods/download-wrike-attachment) or [attachment previews](https://developers.wrike.com/documentation/api/methods/download-attachment-preview))

#### Attachments

When [creating](https://developers.wrike.com/documentation/api/methods/create-wrike-attachment) or [updating](https://developers.wrike.com/documentation/api/methods/update-attachment) Wrike attachments, use the following custom `parameters`:

* `parameters.file` &lt;String|Buffer|Blob|Readable stream&gt; E.g. `'Hello world!'`
* `parameters.name` &lt;String&gt; E.g. `'attachment.txt'`
* `parameters.contentType` &lt;String&gt; E.g. `'text/plain'`
