
const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./app');

test('GET /health devuelve estado OK', async () => {
  const response = await fetch('http://localhost:3001/health');
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.estado, 'OK');
  assert.equal(data.servicio, 'productos');
});

test('GET /productos devuelve tres productos', async () => {
  const response = await fetch('http://localhost:3001/productos');
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.length, 3);
  assert.equal(data[0].nombre, 'Notebook');
});

test('GET /productos/999 devuelve 404', async () => {
  const response = await fetch('http://localhost:3001/productos/999');
  const data = await response.json();

  assert.equal(response.status, 404);
  assert.equal(data.error, 'Producto no encontrado');
});
