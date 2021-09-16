const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/webinar/file',
    createProxyMiddleware({
      target: 'https://backend-didasko.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backend-didasko.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/socket.io/',
    createProxyMiddleware({
      target: 'https://backend-didasko.herokuapp.com/',
      changeOrigin: true,
    })
  );
};