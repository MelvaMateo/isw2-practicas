const { registrarVenta } = require('./sano');

let pasaron = 0;
let fallaron = 0;

function test(nombre, fn) {
    try {
          fn();
          console.log(`OK   ${nombre}`);
          pasaron++;
    } catch (err) {
          console.log(`FAIL ${nombre}`);
          console.log(`     -> ${err.message}`);
          fallaron++;
    }
}

function assertEqual(actual, esperado) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(esperado);
    if (a !== e) {
          throw new Error(`esperado ${e}, obtuve ${a}`);
    }
}

// Test 1: camino feliz, subtotal bajo el umbral de descuento
test('calcula total sin descuento cuando el subtotal es menor a 500', () => {
    const inv = { p1: 10 };
    const resultado = registrarVenta([{ id: 'p1', cant: 2, precio: 100 }], 'normal', inv);
    assertEqual(resultado.total, 230);
    assertEqual(inv.p1, 8);
});

// Test 2: aplica descuento del 10% cuando el subtotal supera 500
test('aplica 10% de descuento cuando el subtotal supera 500', () => {
    const inv = { p1: 10 };
    const resultado = registrarVenta([{ id: 'p1', cant: 6, precio: 100 }], 'normal', inv);
    assertEqual(resultado.total, 621);
});

// Test 3: cantidad invalida retorna null
test('retorna null si la cantidad es 0 o negativa', () => {
    const inv = { p1: 10 };
    const resultado = registrarVenta([{ id: 'p1', cant: 0, precio: 100 }], 'normal', inv);
    assertEqual(resultado, null);
});

// Test 4: stock insuficiente retorna null
test('retorna null si no hay stock suficiente', () => {
    const inv = { p1: 1 };
    const resultado = registrarVenta([{ id: 'p1', cant: 5, precio: 100 }], 'normal', inv);
    assertEqual(resultado, null);
});

// Test 5: cliente mayorista agrega linea extra al recibo
test('agrega "Total mayorista" al recibo cuando el cliente es mayorista', () => {
    const inv = { p1: 10 };
    const resultado = registrarVenta([{ id: 'p1', cant: 2, precio: 100 }], 'mayorista', inv);
    assertEqual(resultado.recibo.includes('Total mayorista: 200'), true);
});

// Test 6: el inventario se descuenta correctamente
test('descuenta del inventario la cantidad vendida', () => {
    const inv = { p1: 10 };
    registrarVenta([{ id: 'p1', cant: 6, precio: 100 }], 'normal', inv);
    assertEqual(inv.p1, 4);
});

console.log(`\n${pasaron} pasaron, ${fallaron} fallaron`);
process.exit(fallaron > 0 ? 1 : 0);
