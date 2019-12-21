import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import neo4j from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import winston from 'winston';

import { typeDefs } from './graphql-schema';

dotenv.config();

const port = Number(process.env.GRAPHQL_LISTEN_PORT);
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const schema = makeAugmentedSchema({
  typeDefs,
});

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.NEO4J_USER || '', process.env.NEO4J_PASSWORD || ''),
);

const server = new ApolloServer({
  context: (req: Express.Request) => ({
    driver,
    ...req,
  }),
  introspection: true,
  playground: true,
  schema,
});

const app = express();
app.use(cors());
app.get('/', (_req, res) => {
  res.status(200).send({ status: 'OK' });
});

server.applyMiddleware({ app });

app.listen(port, '127.0.0.1', () => {
  logger.info(`GraphQL API ready at http://localhost:${port}/graphql`);
});
