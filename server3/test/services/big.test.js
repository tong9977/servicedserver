const assert = require('assert');
const app = require('../../src/app');

describe('\'big\' service', () => {
  it('registered the service', () => {
    const service = app.service('big');

    assert.ok(service, 'Registered the service');
  });
});
