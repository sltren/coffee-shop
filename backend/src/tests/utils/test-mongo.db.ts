import mongoose from 'mongoose';

const MongoURI_Test = 'mongodb://localhost:27017/coffeeshop_test'

export const connectDB_Test = async () => {
  try {
    await mongoose.connect(MongoURI_Test);
    console.log('MongoDB_Tees connected');
  } catch (error) {
    console.error('MongoDB_Test connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB_Test = async () => {
  await mongoose.connection.close();
};
