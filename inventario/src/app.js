
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

const inventario = [
  { id: 1, producto: 'Notebook', stock: 10 },
  { id: 2, producto: 'Mouse', stock: 25 },
  { id: 3, producto: 'Teclado', stock: 15 }
];

app.get('/health', (req, res) => {
  res.status(200).json({
    estado: 'OK',
    servicio: 'inventario'
  });
});

app.get('/inventario', (req, res) => {
  res.status(200).json(inventario);
});

app.get('/inventario/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = inventario.find((producto) => producto.id === id);

  if (!item) {
    return res.status(404).json({
      error: 'Producto no encontrado en inventario'
    });
  }

  res.status(200).json(item);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Microservicio de inventario escuchando en el puerto ${PORT}`);
  });
}
