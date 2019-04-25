const assert = require('assert');
const app = require('../../src/app');

describe('\'technicianBelong\' service', () => {
  it('registered the service', () => {
    const service = app.service('technician-belong');

    assert.ok(service, 'Registered the service');
  });
});
