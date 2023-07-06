module.exports = function override(config, env) {
  // Add resolve fallback configuration
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    stream: require.resolve("readable-stream"),
    fs: false,
  };

  return config;
};
