const assert = require('assert');
const app = require('../../src/app');

describe('\'servicecustom\' service', () => {
  it('registered the service', () => {
    const service = app.service('servicecustom');

    assert.ok(service, 'Registered the service');
  });
});
