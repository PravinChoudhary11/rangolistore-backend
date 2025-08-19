const path = require('path');

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: path.resolve(__dirname, '../src/providers/custom-upload'),
      providerOptions: {},
      breakpoints: [], // Disable responsive image generation
    },
  },
});
