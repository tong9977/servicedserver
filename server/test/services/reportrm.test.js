const assert = require('assert');
const app = require('../../src/app');

describe('\'reportrm\' service', () => {
  it('registered the service', () => {
    const service = app.service('reportrm');

    assert.ok(service, 'Registered the service');
  });
});
