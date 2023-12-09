import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    // setInterval(() => {
    //   jobstreetFetchPelamar();
    // }, 5000);
  } catch (e) {
    console.error(e);
  }
};
