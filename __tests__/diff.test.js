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

const jsonNest = `
{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
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

test('diff nest json', () => {
  expect(diff('./__tests__/fixtures/before_nest.json', './__tests__/fixtures/after_nest.json')).toBe(jsonNest);
});

test('diff nest ini', () => {
  expect(diff('./__tests__/fixtures/before_nest.ini', './__tests__/fixtures/after_nest.ini')).toBe(jsonNest);
});

test('diff nest yml', () => {
  expect(diff('./__tests__/fixtures/before_nest.yml', './__tests__/fixtures/after_nest.yml')).toBe(jsonNest);
});
// test('log', () => {
//   console.log(diff('./__tests__/fixtures/before.ini', './__tests__/fixtures/after.ini'));
// });
