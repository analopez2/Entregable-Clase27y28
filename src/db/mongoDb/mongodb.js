import mongoose from 'mongoose';
import { config } from '../../config/config.js';

const MongoDb = {
  async init() {
    mongoose.connect(
      config.UrlMongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw new Error('Error en la coneccion a la MongoDb: ' + err);
        console.log('MongoDb conectada');
      },
    );
  },
};

export { MongoDb };
