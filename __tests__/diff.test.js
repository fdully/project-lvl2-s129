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

const plainFormat = `
Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value
`;

const jsonFormat = `
{
  "common": {
    "type": "child",
    "oldValue": {
      "setting1": "Value 1",
      "setting2": "200",
      "setting3": true,
      "setting6": {
        "key": "value"
      }
    },
    "newValue": {
      "setting1": "Value 1",
      "setting3": true,
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      }
    },
    "children": {
      "setting1": {
        "type": "same",
        "oldValue": "Value 1",
        "newValue": "Value 1"
      },
      "setting2": {
        "type": "removed",
        "oldValue": "200",
        "newValue": null
      },
      "setting3": {
        "type": "same",
        "oldValue": true,
        "newValue": true
      },
      "setting6": {
        "type": "removed",
        "oldValue": {
          "key": "value"
        },
        "newValue": null
      },
      "setting4": {
        "type": "new",
        "oldValue": null,
        "newValue": "blah blah"
      },
      "setting5": {
        "type": "new",
        "oldValue": null,
        "newValue": {
          "key5": "value5"
        }
      }
    }
  },
  "group1": {
    "type": "child",
    "oldValue": {
      "baz": "bas",
      "foo": "bar"
    },
    "newValue": {
      "foo": "bar",
      "baz": "bars"
    },
    "children": {
      "baz": {
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      "foo": {
        "type": "same",
        "oldValue": "bar",
        "newValue": "bar"
      }
    }
  },
  "group2": {
    "type": "removed",
    "oldValue": {
      "abc": "12345"
    },
    "newValue": null
  },
  "group3": {
    "type": "new",
    "oldValue": null,
    "newValue": {
      "fee": "100500"
    }
  }
}
`;

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

test('diff plain format', () => {
  expect(diff('./__tests__/fixtures/before_nest.yml', './__tests__/fixtures/after_nest.yml', 'plain')).toBe(plainFormat);
});

test('diff json format', () => {
  expect(diff('./__tests__/fixtures/before_nest.json', './__tests__/fixtures/after_nest.json', 'json')).toBe(jsonFormat);
});
