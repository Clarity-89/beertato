module.exports = {
  plugins: [{ plugin: require("@semantic-ui-react/craco-less") }],
  babel: {
    plugins: ["babel-plugin-emotion"],
    presets: ["@emotion/babel-preset-css-prop"]
  }
};
