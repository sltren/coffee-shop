import mongoose from 'mongoose';

const MongoURI = 'mongodb://localhost:27017/coffeeshop'

export const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('MongoDB disconnected');
};
