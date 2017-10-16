import _ from 'lodash';

export default (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  return uniqueKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      if (val1 === val2) {
        return [...acc, {
          type: 'same', name: key, oldValue: val1, newValue: val2,
        }];
      }
      return [...acc, {
        type: 'new', name: key, oldValue: val1, newValue: val2,
      }];
    }
    if (_.has(obj1, key)) {
      return [...acc, {
        type: 'removed', name: key, oldValue: obj1[key], newValue: null,
      }];
    }
    return [...acc, {
      type: 'added', name: key, oldValue: null, newValue: obj2[key],
    }];
  }, []);
};
