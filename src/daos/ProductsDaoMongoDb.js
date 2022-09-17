import { ContenedorMongoDb } from '../contendores/ContenedorMongoDb.js';
import { ProductsSchema } from '../models/ProductsSchema.js';

class ProductsDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('productos', ProductsSchema);
  }
}

export { ProductsDaoMongoDb };
