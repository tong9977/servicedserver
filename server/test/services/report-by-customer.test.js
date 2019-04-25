const assert = require('assert');
const app = require('../../src/app');

describe('\'reportByCustomer\' service', () => {
  it('registered the service', () => {
    const service = app.service('report-by-customer');

    assert.ok(service, 'Registered the service');
  });
});
