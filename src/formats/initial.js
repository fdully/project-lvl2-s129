const flag = {
  new: '+',
  removed: '-',
  same: ' ',
};

const indent = (lvl) => {
  if (lvl === 0) return '';
  const spaceCount = (lvl * 4);
  const makeIndent = (acc, count) => {
    if (count === 0) return acc;
    return makeIndent(acc.concat(' '), count - 1);
  };
  return makeIndent('', spaceCount);
};

const renderObj = (objectValue, lvl) => {
  const keys = Object.keys(objectValue);
  const resultString = keys.map((key) => {
    if (typeof objectValue[key] === 'object') return renderObj(objectValue[key], lvl + 1);
    return `${indent(lvl)}    ${key}: ${objectValue[key]}`;
  }).join('\n');
  return `{\n${resultString}\n${indent(lvl)}}`;
};

const render = (data, lvl) => {
  const renderVal = (value, type) => {
    if (type === 'child') return render(value, lvl + 1);
    return (typeof value === 'object') ? renderObj(value, lvl + 1) : value;
  };

  const template = {
    same: item => `  ${indent(lvl)}${flag.same} ${item.name}: ${renderVal(item.oldValue, item.type)}`,
    changed: item => `  ${indent(lvl)}${flag.new} ${item.name}: ${renderVal(item.newValue, item.type)}\n  ${indent(lvl)}${flag.removed} ${item.name}: ${renderVal(item.oldValue, item.type)}`,
    new: item => `  ${indent(lvl)}${flag.new} ${item.name}: ${renderVal(item.newValue, item.type)}`,
    removed: item => `  ${indent(lvl)}${flag.removed} ${item.name}: ${renderVal(item.oldValue, item.type)}`,
    child: item => `  ${indent(lvl)}${flag.same} ${item.name}: ${renderVal(item.children, item.type)}`,
  };

  const dataString = data.map(item => template[item.type](item)).join('\n');
  return `{\n${dataString}\n${indent(lvl)}}`;
};

export default data => `\n${render(data, 0)}`;
