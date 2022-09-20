import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { DATE_UTILS } from './utils/index.js';
import { DbContainer } from './contenedores/DbContainer.js';
import { KnexService } from './services/index.js';
import { productRouter } from './routers/productRouter.js';
import ProductsFaker from './models/ProductsFaker.js';
import { MensajesDaoMongoDb } from './daos/mensajes/MensajesDaoMongoDb.js';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import { JOI_VALIDATOR } from './utils/joi-validator.js';
import { MongoDb } from './db/mongoDb/mongodb.js';
import { normalize, schema, denormalize } from 'normalizr';
import sessionsRouter from './routers/session.router.js';
import infoRouter from './routers/info.router.js';
import apiRandom from './routers/apiRandom.router.js';
import viewsRouter from './routers/views.router.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { config } from './config/index.js';
import { ServerResponse } from './utils/server.response.js';

MongoDb.init();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MessagesApi = new DbContainer(KnexService.KnexSqlite, 'mensajes');
const ProductsApi = new DbContainer(KnexService.KnexMySQL, 'productos');

const MensajesApiMongo = new MensajesDaoMongoDb();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'handlebars');

const productsFaker = new ProductsFaker();
const schemaAuthor = new schema.Entity('authors', {});
const schemaMensajes = new schema.Entity('mensajes', {
  author: schemaAuthor,
});
const schemaListMensajes = new schema.Entity('listMensajes', {
  mensajes: [schemaMensajes],
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.UrlMongoDB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
    }),
    secret: 'SecretEntregable2526',
    resave: false,
    saveUninitialized: false,
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/mensajes', async (req, res) => {
  try {
    let authorMsj;
    let mensaje;
    const { author, text } = req.body;
    if (author) {
      const { id, nombre, apellido, edad, alias, avatar } = author;
      authorMsj = await JOI_VALIDATOR.author.validateAsync({
        id,
        nombre,
        apellido,
        edad,
        alias,
        avatar,
      });
    }

    if (text) {
      mensaje = { author: authorMsj, text: text };
    }

    const msjSaved = await MensajesApiMongo.save(mensaje);

    ServerResponse.success(res, msjSaved);
  } catch (error) {
    ServerResponse.badRequest(res, error.message);
  }
});

app.get('/api/mensajes/normalizr', async (req, res) => {
  try {
    const msj = await MensajesApiMongo.getAll();

    const originalMsj = {
      id: 'mensajes',
      mensajes: [],
    };

    msj.forEach((element) => {
      originalMsj.mensajes.push({
        id: element._id,
        author: element.author,
        text: element.text,
        timestamp: element.timestamp,
      });
    });

    const normalizedMsjObject = normalize(originalMsj, schemaListMensajes);
    const size_original = JSON.stringify(originalMsj).length;
    const size_normalized = JSON.stringify(normalizedMsjObject).length;
    const percentaje = (size_normalized * 100) / size_original;

    ServerResponse.success(res, { normalizr: normalizedMsjObject, compression: percentaje });
  } catch (error) {
    ServerResponse.badRequest(res, error.message);
  }
});

app.get('/api/mensajes/denormalizr', async (req, res) => {
  try {
    const msj = await MensajesApiMongo.getAll();

    const originalMsj = {
      id: 'mensajes',
      mensajes: [],
    };

    msj.forEach((element) => {
      originalMsj.mensajes.push({
        id: element._id,
        author: element.author,
        text: element.text,
        timestamp: element.timestamp,
      });
    });

    const normalizedMsjObject = normalize(originalMsj, schemaListMensajes);
    const denormalizeMsjObject = denormalize(normalizedMsjObject.result, schemaListMensajes, normalizedMsjObject.entities);

    console.log(JSON.stringify(denormalizeMsjObject, null, '\t'));
    ServerResponse.success(res, denormalizeMsjObject);
  } catch (error) {
    ServerResponse.badRequest(res, error.message);
  }
});

app.get('/api/productos-test', async (req, res) => {
  try {
    let productos = await productsFaker.getAll();
    if (productos.length > 0) {
      res.render('products', { products: productos });
    } else {
      productsFaker.populate();
      let productos = await productsFaker.getAll();
      res.render('products', { products: productos });
    }
  } catch (error) {
    console.log(error);
    ServerResponse.internalError(res, error);
  }
});

io.on('connection', async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit('mensajes', await MessagesApi.getAll());

  socket.on('mensajeNuevo', async ({ email, text }) => {
    const message = { email, text, timestamp: DATE_UTILS.getTimestamp() };
    await MessagesApi.save(message);

    io.sockets.emit('mensajes', await MessagesApi.getAll());
  });

  socket.emit('products', await ProductsApi.getAll());

  socket.on('add-product', async (data) => {
    await ProductsApi.save(data);

    io.sockets.emit('products', await ProductsApi.getAll());
  });
});

app.use('/', viewsRouter);
app.use('/api/productos', productRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/info', infoRouter);
app.use('/api/randoms', apiRandom);

KnexService.init();
const server = httpServer.listen(config.server.PORT, () => {
  console.log(`Servidor escuchando en puerto ${config.server.PORT}`);
});
server.on('error', (error) => {
  console.error(`Error en el servidor ${error}`);
});
