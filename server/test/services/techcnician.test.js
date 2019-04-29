const assert = require('assert');
const app = require('../../src/app');

describe('\'techcnician\' service', () => {
  it('registered the service', () => {
    const service = app.service('techcnician');

    assert.ok(service, 'Registered the service');
  });
});
