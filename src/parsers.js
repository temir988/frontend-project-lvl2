import yaml from 'js-yaml';

/**
 *
 * @param {String} ext
 * @param {String}  data
 * @return {Object}
 */
const parseFile = (ext, data) => {
  const parser = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };

  return parser[ext](data);
};

export default parseFile;
