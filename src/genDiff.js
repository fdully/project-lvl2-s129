import fs from 'fs';
import path from 'path';
import compare from './compare';
import render from './render';
import parse from './parse';

export default (firstConfig, secondConfig) => {
  const firstData = fs.readFileSync(firstConfig, 'utf-8');
  const secondData = fs.readFileSync(secondConfig, 'utf-8');
  const type = path.extname(firstConfig).split('.')[1];
  const firstObj = parse(firstData, type);
  const secondObj = parse(secondData, type);
  return render(compare(firstObj, secondObj));
};
