import { ContenedorMongoDb } from '../contendores/ContenedorMongoDb.js';
import { Carritos } from '../models/Carritos.js';

class CarritoDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('carritos', Carritos);
  }
}

export { CarritoDaoMongoDb };
