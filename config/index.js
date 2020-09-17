const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const errorCodes = require('./errors');

module.exports = {
  migrate: false,
  publicRoutes,
  privateRoutes,
  errorCodes,
  port: process.env.PORT || '2017',
  useAuthentication: true,
};
