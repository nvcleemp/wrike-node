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
  .get('tasks', { limit: 3 })
  .then(tasks => console.log(tasks));
```

## Reference

### new Wrike(accessToken[, apiRegion = 'us'[, apiVersion = 4]])

* `accessToken` &lt;String&gt;
* `apiRegion` &lt;String&gt; Either `'us'` or `'eu'` *Used to determine the API base URL.*
* `apiVersion` &lt;Integer&gt;

### wrike.get|post|put|delete(path[, parameters])

* `path` &lt;String&gt; E.g. `'folders/IEABQ4RUI4AQJFU3/tasks'`
* `parameters` &lt;Object&gt; E.g. `{ importance: 'High' }` *For all options, see: https://developers.wrike.com/documentation*

Always returns a `Promise`, resolving to either:

1. The result object's `data` <Array> property
2. A Node.js [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) (only when downloading [attachments](https://developers.wrike.com/documentation/api/methods/download-wrike-attachment) or [attachment previews](https://developers.wrike.com/documentation/api/methods/download-attachment-preview))

#### Attachments

When [creating](https://developers.wrike.com/documentation/api/methods/create-wrike-attachment) or [updating](https://developers.wrike.com/documentation/api/methods/update-attachment) Wrike attachments, use the following **custom** `parameters`:

* `parameters.file` &lt;String|Buffer|Blob|Readable stream&gt; E.g. `'Hello world!'`
* `parameters.name` &lt;String&gt; E.g. `'attachment.txt'`
* `parameters.contentType` &lt;String&gt; E.g. `'text/plain'`
