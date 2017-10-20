const renderVal = value => (typeof value === 'object' ? 'complex value' : `value: ${value}`);

const combineName = (data, name) =>
  data.map((item) => {
    const fullPath = name.concat(item.name);
    switch (item.type) {
      case 'child':
        return combineName(item.children, fullPath);
      case 'changed':
        return `Property '${fullPath.join('.')}' was updated. From '${item.oldValue}' to '${item.newValue}'\n`;
      case 'new':
        return `Property '${fullPath.join('.')}' was added with ${renderVal(item.newValue)}\n`;
      case 'removed':
        return `Property '${fullPath.join('.')}' was removed\n`;
      default:
        return '';
    }
  }).join('');

export default data => `\n${combineName(data, [])}`;
