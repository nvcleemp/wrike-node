export const validateClassArguments = (accessToken, apiRegion, apiVersion) => {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new Error('Please provide a valid Wrike API access token.');
  }

  if (!apiRegion || !['us', 'eu'].includes(apiRegion)) {
    throw new Error('Please provide a valid Wrike API region ("us" or "eu").');
  }

  if (!apiVersion || typeof apiVersion !== 'number') {
    throw new Error('Please provide a valid Wrike API version number.');
  }
};

export const validateFetchArguments = (path, parameters) => {
  if (!path || typeof path !== 'string' || !/^\/[^/]/.test(path)) {
    throw new Error('Please provide a valid Wrike API method "path", e.g. "/tasks"');
  }

  if (parameters && (typeof parameters !== 'object' || Array.isArray(parameters))) {
    throw new Error('The "parameters" argument has to be of type "object".');
  }
};
