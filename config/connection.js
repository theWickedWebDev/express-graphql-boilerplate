const development = {
  database: 'lawn_care',
  username: 'root',
  password: 'password',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const testing = {
  database: 'lawn_care',
  username: 'root',
  password: 'password',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
};

module.exports = {
  development,
  testing,
  production,
};
