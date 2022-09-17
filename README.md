# Iniciar el servidor:

npm start

## Vistas:

```bash
"/login" Formulario de login
```

```bash
"/register" Formulario de registro
```

```bash
"/" HomePage con formulario para ingreso de productos nuevos
```

### Get Productos:

#### Request:

```bash
GET /api/productos
```

#### Response:

Array de productos

```javascript
[
  {
    title: String,
    price: Number,
    thumbnail: String,
  },
];
```

### Crear Producto:

#### Request:

```bash
POST /api/productos
```

Body:

```javascript
{
    "title": String,
    "price": Number,
    "thumbnail": String,
}
```

#### Response:

```javascript
{
    "id": Number,
    "title": String,
    "price": Number,
    "thumbnail": String,
    "timestamp": Date
}
```
