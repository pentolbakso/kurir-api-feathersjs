const app = require('../../src/app');

describe('\'addresses\' service', () => {
  it('registered the service', () => {
    const service = app.service('addresses');
    expect(service).toBeTruthy();
  });
});
