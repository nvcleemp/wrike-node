import { validateClassArguments, validateFetchArguments } from './validate';

describe('Testing the class arguments', () => {
  describe('Testing the "accessToken" argument', () => {
    test('Can\'t construct with an undefined access token', () => {
      expect(() => validateClassArguments()).toThrow();
    });

    test('Can\'t construct with an empty access token', () => {
      expect(() => validateClassArguments('')).toThrow();
    });
  });

  describe('Testing the "apiRegion" argument', () => {
    test('Can\'t construct with an invalid region', () => {
      expect(() => validateClassArguments('1', 'uk')).toThrow();
    });
  });

  describe('Testing the "apiVersion" argument', () => {
    test('The API version has to be of type number', () => {
      expect(() => validateClassArguments('1', 'us', '4')).toThrow();
    });
  });
});

describe('Testing the fetch arguments', () => {
  describe('Testing the "path" argument', () => {
    test('Can\'t call API with an undefined path', () => {
      expect(() => validateFetchArguments()).toThrow();
    });

    test('Can\'t call API with an empty path', () => {
      expect(() => validateFetchArguments('')).toThrow();
    });

    test('Can\'t call the API root', () => {
      expect(() => validateFetchArguments('/')).toThrow();
    });

    test('The API method path has to be of type string', () => {
      expect(() => validateFetchArguments(['/tasks'])).toThrow();
    });

    test('The API method path CAN be called without parameters', () => {
      expect(() => validateFetchArguments('/tasks')).not.toThrow();
    });
  });

  describe('Testing the "parameters" argument', () => {
    test('The API parameters argument has to be of type object', () => {
      expect(() => validateFetchArguments('/tasks', [])).toThrow();
    });
  });
});
