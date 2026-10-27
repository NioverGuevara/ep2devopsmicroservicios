
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const productos = [
  { id: 1, nombre: 'Notebook', precio: 550000 },
  { id: 2, nombre: 'Mouse', precio: 12000 },
  { id: 3, nombre: 'Teclado', precio: 25000 }
];

app.get('/health', (req, res) => {
  res.status(200).json({ estado: 'OK', servicio: 'productos' });
});

app.get('/productos', (req, res) => {
  res.status(200).json(productos);
});

app.get('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.status(200).json(producto);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Microservicio de productos escuchando en el puerto ${PORT}`);
  });
}
