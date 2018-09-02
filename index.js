const defaultServerKey = "serverRuntimeConfig";
const defaultPublicKey = "publicRuntimeConfig";

module.exports = (nextConfig = {}) => {
  const config = require("config");

  const {
    nodeConfigServerKey = defaultServerKey,
    nodeConfigPublicKey = defaultPublicKey
  } = nextConfig;

  return Object.assign({}, nextConfig, {
    serverRuntimeConfig: Object.assign(
      {},
      nextConfig.serverRuntimeConfig,
      config[nodeConfigServerKey]
    ),
    publicRuntimeConfig: Object.assign(
      {},
      nextConfig.publicRuntimeConfig,
      config[nodeConfigPublicKey],
      nodeConfigServerKey === defaultServerKey ? null : { nodeConfigServerKey },
      nodeConfigPublicKey === defaultPublicKey ? null : { nodeConfigPublicKey }
    ),
    webpack(config, options) {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias.config$ = require.resolve("./config");

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
