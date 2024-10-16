import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import authValidator from './middlewares/authValidator';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts
        // You can also add other directives as needed
      },
    },
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the server' });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Middleware to check JWT
if (process.argv.includes('--withauth')) app.use(authValidator);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
