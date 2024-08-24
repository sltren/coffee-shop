import { createTestServer } from './test-server';
import { connectDB_Test, disconnectDB_Test } from './test-mongo.db';

let testServer: any;
let testPort: any;
let testHost: any;

export const setupTestServer = async () => {
    const app = await createTestServer();

    await new Promise<void>(async (resolve) => {
        testServer = app?.listen(0, () => {
            testPort = testServer.address().port;
            testHost = process.env.TEST_HOST || 'localhost';
            resolve();
        });
    });

    return { testServer, testPort, testHost };
};

export const teardownTestServer = async () => {
    await testServer.close();
};

export const setupDatabase = async () => {
    await connectDB_Test();
};

export const teardownDatabase = async () => {
    await disconnectDB_Test();
};