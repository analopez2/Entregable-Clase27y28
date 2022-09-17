import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import joi from 'joi';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const IS_ADMIN = true;

export const isAdmin = (req, res, next) => {
  if (!IS_ADMIN) {
    return res.send({
      error: 403,
      descripcion: `ruta ${req.baseUrl} | method ${req.method} no autorizado`,
    });
  }
  next();
};

export const productValidation = joi.object({
  nombre: joi.string().required(),
  descripcion: joi.string().required(),
  codigo: joi.string().required(),
  foto: joi.string().required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
