import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: JSON.parse,
  ini: ini.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, type) => parser[type](data);
