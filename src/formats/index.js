import plain from './plain';
import initial from './initial';

const getFormatType = {
  plain, initial,
};

export default format => getFormatType[format];
