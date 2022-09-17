import express from 'express';
import { config } from './config/config.js';
import handlebars from 'express-handlebars';
import __dirname from './utils/utils.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { MongoDb } from './db/mongoDb/mongodb.js';

const app = express();
const server = app.listen(config.server.PORT, () => console.log(`Listening on port ${config.server.PORT}`));
const connection = MongoDb.init();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(
  session({
    secret: 'SecretTestClase',
    store: MongoStore.create({
      mongoUrl: config.UrlMongoDB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/productos', productsRouter);
app.use('/api/sessions', sessionRouter);
