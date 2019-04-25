const assert = require('assert');
const app = require('../../src/app');

describe('\'tbCompany\' service', () => {
  it('registered the service', () => {
    const service = app.service('tb-company');

    assert.ok(service, 'Registered the service');
  });
});
