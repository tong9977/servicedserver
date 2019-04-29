const assert = require('assert');
const app = require('../../src/app');

describe('\'reporttechnicianbelong\' service', () => {
  it('registered the service', () => {
    const service = app.service('reporttechnicianbelong');

    assert.ok(service, 'Registered the service');
  });
});
