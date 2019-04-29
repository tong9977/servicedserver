const assert = require('assert');
const app = require('../../src/app');

describe('\'reporttechnicianbelongperson\' service', () => {
  it('registered the service', () => {
    const service = app.service('reporttechnicianbelongperson');

    assert.ok(service, 'Registered the service');
  });
});
