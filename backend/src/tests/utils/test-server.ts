import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../../graphql/schemas/index';
import { resolvers } from '../../graphql/resolvers/index';

const createTestServer = async() => {
    try {
        const app = express();
        const server = new ApolloServer({ typeDefs, resolvers });

        server.start().then(() => {
            server.applyMiddleware({ app: app as any, path: '/graphql' });
        });

        return app;
    } catch (error) {
        console.error('Error starting test server:', error);
    }
};

export { createTestServer };