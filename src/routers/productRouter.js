import { Router } from 'express';
import { DbContainer } from '../contenedores/DbContainer.js';
import { KnexService } from '../services/index.js';
import { ServerResponse } from '../utils/server.response.js';

const productRouter = Router();
const ProductApi = new DbContainer(KnexService.KnexMySQL, 'productos');

productRouter.get('/', async (req, res) => {
  try {
    const response = await ProductApi.getAll();

    if (!response) return ServerResponse.notFound(res);

    ServerResponse.success(res, response);
  } catch (error) {
    console.log(error);
    ServerResponse.internalError(res, error);
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;

    if ((!title, !price, !thumbnail)) {
      ServerResponse.badRequest(res);
    }

    const product = { title, price, thumbnail };

    const productSaved = await ProductApi.save(product);
    ServerResponse.success(res, productSaved);
  } catch (error) {
    console.log(error);
    ServerResponse.internalError(res, error);
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductApi.getById(id);

    if (product.length == 0) return ServerResponse.notFound(res);

    ServerResponse.success(res, product);
  } catch (error) {
    console.log(error);
    ServerResponse.internalError(res, error);
  }
});

productRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    if ((!title, !price, !thumbnail)) {
      ServerResponse.badRequest(res);
    }

    const product = { title, price, thumbnail };

    const productUpdate = await ProductApi.update(product, id);

    ServerResponse.success(res, productUpdate);
  } catch (error) {
    console.log(error);
    ServerResponse.internalError(res, error);
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductApi.getById(id);
    if (!product) return ServerResponse.notFound(res);

    await ProductApi.deleteById(id);

    ServerResponse.success(res, product);
  } catch (error) {
    console.log(error);
    ServerResponse.internalError(res, error);
  }
});

export { productRouter };
