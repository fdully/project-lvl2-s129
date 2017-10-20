import fs from 'fs';
import path from 'path';
import compare from './compare';
import getFormat from './formats/index';
import parse from './parse';

export default (firstConfig, secondConfig, formatType = 'initial') => {
  const firstData = fs.readFileSync(firstConfig, 'utf-8');
  const secondData = fs.readFileSync(secondConfig, 'utf-8');
  const type = path.extname(firstConfig).split('.')[1];
  const firstObj = parse(firstData, type);
  const secondObj = parse(secondData, type);
  const format = getFormat(formatType);
  return format(compare(firstObj, secondObj));
};
