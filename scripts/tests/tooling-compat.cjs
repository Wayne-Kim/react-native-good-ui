const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');
const example = createRequire(path.resolve('example/package.json'));

test('legacy UUID imports preserve v4 and deterministic v5 behavior', () => {
  const uuid = example('uuid');
  assert.equal(uuid.validate(uuid.v4()), true);
  const v5 = example('uuid/v5');
  assert.equal(v5('www.example.com', v5.DNS), '2ed6657d-e927-568b-95e1-2665a8aea6a2');
});

test('legacy image-size APIs parse PNG and reject malformed ICNS', async () => {
  const size = example('image-size');
  const file = path.resolve('example/assets/splash.png');
  const bytes = fs.readFileSync(file);
  assert.ok(size(bytes).width > 0);
  assert.deepEqual(size(file), size(bytes));
  await new Promise((resolve, reject) => size(file, (error, result) => {
    if (error) return reject(error);
    try { assert.deepEqual(result, size(bytes)); resolve(); } catch (e) { reject(e); }
  }));
  assert.throws(() => size(Buffer.from('69636e73000000106963303700000000', 'hex')));
});

test('IP classification rejects loopback aliases', () => {
  for (const address of ['127.0.0.1', '0x7f.1', '127.1', '::1']) {
    assert.equal(require('ip').isPublic(address), false, address);
    assert.equal(example('ip').isPublic(address), false, address);
  }
});
