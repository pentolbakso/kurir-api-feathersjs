const app = require('../../src/app');

describe('\'villages\' service', () => {
  it('registered the service', () => {
    const service = app.service('villages');
    expect(service).toBeTruthy();
  });
});
