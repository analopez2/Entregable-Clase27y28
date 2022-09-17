import { Router } from 'express';
import { ProductService } from '../services/products/products.service.js';
import { isAdmin } from '../utils.js';

const productsRouter = Router();

productsRouter.get('/', ProductService.getAllProducts);

productsRouter.post('/', isAdmin, ProductService.saveProduct);

productsRouter.put('/:id', isAdmin, ProductService.updateProduct);

productsRouter.get('/:id', ProductService.getProductById);

productsRouter.delete('/:id', isAdmin, ProductService.deletedProductById);

export default productsRouter;
