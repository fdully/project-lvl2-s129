export default (data) => {
  const sameSign = '    ';
  const newSign = '  + ';
  const removedSign = '  - ';
  const addedSign = '  + ';

  const generateLine = (obj) => {
    const {
      type, name, oldValue, newValue,
    } = obj;
    switch (type) {
      case 'same':
        return `${sameSign}${name}: ${oldValue}\n`;
      case 'new':
        return `${newSign}${name}: ${newValue}\n${removedSign}${name}: ${oldValue}\n`;
      case 'removed':
        return `${removedSign}${name}: ${oldValue}\n`;
      case 'added':
        return `${addedSign}${name}: ${newValue}\n`;
      default:
        return '';
    }
  };

  const body = data.reduce((acc, item) => (`${acc}${generateLine(item)}`), '');

  return `\n{\n${body}}`;
};
