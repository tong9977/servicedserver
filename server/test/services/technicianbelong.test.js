const assert = require('assert');
const app = require('../../src/app');

describe('\'technicianbelong\' service', () => {
  it('registered the service', () => {
    const service = app.service('technicianbelong');

    assert.ok(service, 'Registered the service');
  });
});
