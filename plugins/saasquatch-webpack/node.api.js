/**
 *
 *
 * Allows webpack customization (used to be part of core react-static, but not anymore)
 */
export default ({ externals }) => {
  return {
    webpack: (config, { stage }) => {
      if (stage === "prod") {
        config.externals.push(externals);
      } else if (stage === "dev") {
      }
      return config;
    },
  };
};
