var getConfig = require("next/config");

var { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

/**
 * Underlying `get` mechanism.
 *
 * Adapted from `node-config`.
 */
function getImpl(obj, property) {
  var keys = Array.isArray(property) ? property : property.split(".");
  var value = obj;
  for (var i = 0; i < keys.length; i++) {
    if (value === null || typeof value !== "object") {
      value = undefined;
      break;
    }
    var key = keys[i];
    value = value[key];
  }
  return value;
}

/**
 * Get a configuration value.
 *
 * This will return the specified property value, throwing an exception if the
 * configuration isn't defined. It is used to assure configurations are defined
 * before being used, and to prevent typos.
 *
 * Adapted from `node-config`.
 */
function get(obj, property) {
  if (property === null || property === undefined) {
    throw new Error("Calling config.get with null or undefined argument");
  }
  var value = getImpl(obj, property);
  if (value === undefined) {
    throw new Error('Configuration property "' + property + '" is not defined');
  }
  return value;
}

/**
 * Test that a configuration parameter exists.
 *
 * Adapted from `node-config`.
 */
function has(obj, property) {
  if (property === null || property === undefined) {
    return false;
  }
  return getImpl(obj, property) !== undefined;
}

const {
  nodeConfigServerKey = "serverRuntimeConfig",
  nodeConfigPublicKey = "publicRuntimeConfig"
} = publicRuntimeConfig;

var config = {};
config[nodeConfigServerKey] = serverRuntimeConfig;
config[nodeConfigPublicKey] = publicRuntimeConfig;
config.get = get.bind(config, config);
config.has = has.bind(config, config);

module.exports = config;
