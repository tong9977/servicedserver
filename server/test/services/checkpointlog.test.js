const assert = require('assert');
const app = require('../../src/app');

describe('\'checkpointlog\' service', () => {
  it('registered the service', () => {
    const service = app.service('checkpointlog');

    assert.ok(service, 'Registered the service');
  });
});
