const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/webinar/file',
    createProxyMiddleware({
      target: 'http://68.183.188.150:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://68.183.188.150:8000',
      changeOrigin: false,
    })
  );
  app.use(
    '/socket.io/',
    createProxyMiddleware({
      target: 'http://68.183.188.150:8000',
      changeOrigin: false,
    })
  );
};