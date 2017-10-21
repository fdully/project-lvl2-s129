import plain from './plain';
import json from './json';
import initial from './initial';

const getFormatType = {
  plain, initial, json,
};

export default format => getFormatType[format];
