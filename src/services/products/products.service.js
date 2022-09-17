import { ProductsDaoMongoDb } from '../../daos/ProductsDaoMongoDb.js';
import { errors } from '../../consts/const.js';
import { productValidation } from '../../utils/utils.js';
const products = new ProductsDaoMongoDb();

class ProductService {
  static async getAllProducts(req, res) {
    try {
      const response = await products.getAll();
      if (!response) throw { error: errors.productNotFound };
      res.send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async saveProduct(req, res) {
    try {
      const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
      const product = await productValidation.validateAsync({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
      });

      const productSaved = await products.save(product);
      res.send(productSaved);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

      const product = await productValidation.validateAsync({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
      });

      const productUpdate = await products.updateById(id, product);

      res.send(productUpdate);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await products.getById(id);

      if (!product) {
        throw { error: errors.productNotFound };
      }

      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async deletedProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await products.getById(id);
      if (!product) {
        throw { error: errors.productNotFound };
      }
      await products.deleteById(id);

      res.send({
        mensaje: 'Producto eliminado',
        product: product,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
export { ProductService };
