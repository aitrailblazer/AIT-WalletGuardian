const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.circle.com', // Replace with the API base URL
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Optional: rewrite the path
      },
    },
  },
});
