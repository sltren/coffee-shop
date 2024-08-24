import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './db/mongo.db';
import { typeDefs } from './graphql/schemas/index';
import { resolvers } from './graphql/resolvers/index';

export const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

export const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  try {
    await connectDB();
    await server.start();
    server.applyMiddleware({ app: app as any, path: '/graphql' });

    app.listen(port, () => {
      console.log(`Coffee Shop app listening at http://localhost:${port}`);
      console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`);
    });
   
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();