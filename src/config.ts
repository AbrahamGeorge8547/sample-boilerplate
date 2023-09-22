import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongodb: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
  }
};
