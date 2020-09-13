/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');

/**
 * server configuration
 */
const config = require('../config/');
const auth = require('./policies/auth.policy');
const dbService = require('./services/db.service');
const { schema } = require('./graphql');
const { User } = require('./models');

// environment: development, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const api = express();
const server = http.Server(api);
const mappedRoutes = mapRoutes(config.publicRoutes, 'src/controllers/');
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public REST API
api.use('/rest', mappedRoutes);

// private GraphQL API
if (config.useAuthentication) {
  const authenticate = (req, res, next) => auth(req, res, next);
  api.post('/graphql', authenticate);
} else {
  api.post('/graphql');
}

const graphQLServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    const user = await User.findOne();
    // try to retrieve a user with the token
    //$ curl -i -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MDAxY2YzLTU4Y2QtNGFkMC1iZjEwLTkwNzk2MzY0ZjU0NyIsImlhdCI6MTYwMDAyNjU3NiwiZXhwIjoxNjAwMDM3Mzc2fQ.oU97J7giTEDTMLTxfiLn8suwvVOD5Q5Fw0gJE0qBFSc" -X POST -d '{"query": "{userQuery{id, firstName, lastName, email}}"}'  http://localhost:2017/graphql
    //const user = getUser(token);
    console.log('BANG BANG');
    console.log(user.id);
    console.log('BANG BANG');
    // add the userId to the context
    return { user: { id: user.id } };
  },
});

graphQLServer.applyMiddleware({
  app: api,
  cors: {
    origin: true,
    credentials: true,
    methods: ['POST'],
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  },
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});

server.listen(config.port, () => {
  if (environment !== 'production'
    && environment !== 'development'
    && environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
