import { ContenedorMongoDb } from '../contendores/ContenedorMongoDb.js';
import { MensajesSchema } from '../models/MensajesSchema.js';

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('mensajes', MensajesSchema);
  }
}

export { MensajesDaoMongoDb };
