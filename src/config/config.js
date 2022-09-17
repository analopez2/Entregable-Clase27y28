import dotenv from 'dotenv';
const DEV_PORT = 8080;
dotenv.config();

export const config = {
  server: {
    PORT: process.env.PORT || DEV_PORT,
  },
  UrlMongoDB: process.env.URL,
};
