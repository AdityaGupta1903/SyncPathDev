module.exports = {
  webpack(config, { isServer }) {
    // Add support for TypeScript files in Webpack
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    });
    return config;
  },
};
