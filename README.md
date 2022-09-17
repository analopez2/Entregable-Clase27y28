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
    _id: String,
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
    timestamp: Date,
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
    "nombre": String,
    "descripcion": String,
    "codigo": String,
    "foto": String,
    "precio": Number,
    "stock": Number,
  }
```

#### Response:

```javascript
{
    "_id": String,
    "nombre": String,
    "descripcion": String,
    "codigo": String,
    "foto": String,
    "precio": Number,
    "stock": Number,
    "timestamp": Date
}
```
