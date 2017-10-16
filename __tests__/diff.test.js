import diff from '../src';

const jsonDiff1 = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const jsonDiff2 = `
{
  + host: www.hexlet.io
  - host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;


test('diff json', () => {
  expect(diff('./__tests__/fixtures/before.json', './__tests__/fixtures/after.json')).toBe(jsonDiff1);
});

test('diff yml', () => {
  expect(diff('./__tests__/fixtures/before.yml', './__tests__/fixtures/after.yml')).toBe(jsonDiff1);
});

test('diff ini', () => {
  expect(diff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.ini')).toBe(jsonDiff2);
});

// test('log', () => {
//   console.log(diff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.ini'));
// });
