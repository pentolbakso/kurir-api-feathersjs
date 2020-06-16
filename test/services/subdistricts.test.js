const app = require('../../src/app');

describe('\'subdistricts\' service', () => {
  it('registered the service', () => {
    const service = app.service('subdistricts');
    expect(service).toBeTruthy();
  });
});
