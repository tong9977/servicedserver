const assert = require('assert');
const app = require('../../src/app');

describe('\'joblog\' service', () => {
  it('registered the service', () => {
    const service = app.service('joblog');

    assert.ok(service, 'Registered the service');
  });
});
