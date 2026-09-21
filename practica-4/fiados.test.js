const { calcularMora, calcularSaldoConAbonos } = require('./fiados');

let pasaron = 0;
let fallaron = 0;

function test(nombre, fn) {
try {
fn();
console.log(`OK ${nombre}`);
pasaron++;
} catch (err) {
console.log(`FAIL ${nombre}`);
console.log(` -> ${err.message}`);
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

// --- Practica 9: contrato para abonos parciales (escrito ANTES de implementar calcularSaldoConAbonos) ---

// Test 8: camino feliz - un abono parcial reduce el saldo antes de calcular la mora
test('un abono parcial reduce el saldo antes de calcular la mora', () => {
const montoOriginal = 1000;
const abonos = [400];
const diasVencidos = 10;
const resultado = calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos);
assertEqual(resultado.saldo, 600);
assertEqual(resultado.mora, 30);
assertEqual(resultado.total, 630);
});

// Test 9: varios abonos se suman antes de calcular el saldo
test('varios abonos parciales se suman antes de calcular el saldo', () => {
const montoOriginal = 1000;
const abonos = [300, 200];
const diasVencidos = 5;
const resultado = calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos);
assertEqual(resultado.saldo, 500);
assertEqual(resultado.mora, 25);
});

// Test 10: borde - sin abonos, se comporta igual que calcularMora sobre el monto completo
test('sin abonos, el saldo y la mora son iguales que sobre el monto completo', () => {
const montoOriginal = 1000;
const abonos = [];
const diasVencidos = 10;
const resultado = calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos);
assertEqual(resultado.saldo, 1000);
assertEqual(resultado.mora, 50);
});

// Test 11: borde - los abonos cubren el monto completo, saldo y mora en 0 aunque este vencido
test('si los abonos cubren el monto completo, el saldo y la mora son 0 aunque este vencido', () => {
const montoOriginal = 500;
const abonos = [500];
const diasVencidos = 15;
const resultado = calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos);
assertEqual(resultado.saldo, 0);
assertEqual(resultado.mora, 0);
});

// Test 12: error - los abonos no pueden superar el monto original
test('lanza error si la suma de los abonos supera el monto original', () => {
const montoOriginal = 1000;
const abonos = [600, 500];
const diasVencidos = 0;
assertThrows(() => calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos));
});

console.log(`\n${pasaron} pasaron, ${fallaron} fallaron`);
process.exit(fallaron > 0 ? 1 : 0);
