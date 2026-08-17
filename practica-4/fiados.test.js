const { calcularMora } = require('./fiados');

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
        if (actual !== esperado) {
                  throw new Error(`esperado ${esperado}, obtuve ${actual}`);
        }
}

function assertThrows(fn) {
        try {
                  fn();
        } catch (err) {
                  return;
        }
        throw new Error('se esperaba que la funcion lanzara un error y no lo hizo');
}

// Test 1: camino feliz
test('calcula 5% de mora cuando el fiado esta vencido', () => {
        const monto = 1000;
        const diasVencidos = 10;
        const mora = calcularMora(monto, diasVencidos);
        assertEqual(mora, 50);
});

// Test 2: borde - dias vencidos en 0 (no vencido)
test('no genera mora cuando diasVencidos es 0', () => {
        const monto = 1000;
        const diasVencidos = 0;
        const mora = calcularMora(monto, diasVencidos);
        assertEqual(mora, 0);
});

// Test 3: borde - monto en 0
test('no genera mora cuando el monto es 0, aunque este vencido', () => {
        const monto = 0;
        const diasVencidos = 10;
        const mora = calcularMora(monto, diasVencidos);
        assertEqual(mora, 0);
});

// Test 4 (fue RED antes de implementar la validacion): monto negativo
test('lanza error si el monto es negativo', () => {
        const monto = -100;
        const diasVencidos = 5;
        assertThrows(() => calcularMora(monto, diasVencidos));
});

// Test 5 (fue RED antes de implementar la validacion): dias no numericos
test('lanza error si diasVencidos no es un numero', () => {
        const monto = 100;
        const diasVencidos = 'cinco';
        assertThrows(() => calcularMora(monto, diasVencidos));
});

// Test 6: borde - diasVencidos es NaN
test('lanza error si diasVencidos es NaN', () => {
        const monto = 100;
        const diasVencidos = NaN;
        assertThrows(() => calcularMora(monto, diasVencidos));
});

// Test 7: borde - diasVencidos es undefined
test('lanza error si diasVencidos es undefined', () => {
        const monto = 100;
        const diasVencidos = undefined;
        assertThrows(() => calcularMora(monto, diasVencidos));
});

console.log(`\n${pasaron} pasaron, ${fallaron} fallaron`);
process.exit(fallaron > 0 ? 1 : 0);
