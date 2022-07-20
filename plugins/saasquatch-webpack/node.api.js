/**
 *
 *
 * Allows webpack customization (used to be part of core react-static, but not anymore)
 */
export default ({ externals }) => {
  return {
    webpack: (config, { stage }) => {
      console.log("JOHAN", stage, config.externals);
      if (stage === "prod") {
        config.externals = externals;
      } else if (stage === "dev") {
      }
      return config;
    },
  };
};
