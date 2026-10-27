
const test = require('node:test');
const assert = require('node:assert/strict');

const BASE_URL = 'http://localhost:3002';

test('GET /health devuelve estado OK para inventario', async () => {
  const response = await fetch(`${BASE_URL}/health`);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.estado, 'OK');
  assert.equal(data.servicio, 'inventario');
});

test('GET /inventario devuelve tres productos', async () => {
  const response = await fetch(`${BASE_URL}/inventario`);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.length, 3);
  assert.equal(data[0].stock, 10);
});

test('GET /inventario/999 devuelve 404', async () => {
  const response = await fetch(`${BASE_URL}/inventario/999`);
  const data = await response.json();

  assert.equal(response.status, 404);
  assert.equal(data.error, 'Producto no encontrado en inventario');
});
