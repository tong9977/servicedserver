const assert = require('assert');
const app = require('../../src/app');

describe('\'informrate\' service', () => {
  it('registered the service', () => {
    const service = app.service('informrate');

    assert.ok(service, 'Registered the service');
  });
});
