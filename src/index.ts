import connectDB from './database/connector';
import server from './server';

const start = async () => {
  try {
    await connectDB()
    await server.listen({
      port: 3000
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();