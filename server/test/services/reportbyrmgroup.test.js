const assert = require('assert');
const app = require('../../src/app');

describe('\'reportbyrmgroup\' service', () => {
  it('registered the service', () => {
    const service = app.service('reportbyrmgroup');

    assert.ok(service, 'Registered the service');
  });
});
