const assert = require('assert');
const app = require('../../src/app');

describe('\'techniciansupport\' service', () => {
  it('registered the service', () => {
    const service = app.service('techniciansupport');

    assert.ok(service, 'Registered the service');
  });
});
