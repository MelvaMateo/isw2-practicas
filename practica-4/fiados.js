function calcularMora(monto, diasVencidos) {
if (typeof monto !== 'number' || Number.isNaN(monto)) {
throw new Error('El monto debe ser un numero');
}
if (monto < 0) {
throw new Error('El monto no puede ser negativo');
}
if (typeof diasVencidos !== 'number' || Number.isNaN(diasVencidos)) {
throw new Error('diasVencidos debe ser un numero');
}
if (diasVencidos > 0) {
return monto * 0.05;
}
return 0;
}

function calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos) {
if (!Array.isArray(abonos)) {
throw new Error('abonos debe ser un arreglo de numeros');
}
const totalAbonado = abonos.reduce((suma, abono) => {
if (typeof abono !== 'number' || Number.isNaN(abono) || abono < 0) {
throw new Error('cada abono debe ser un numero no negativo');
}
return suma + abono;
}, 0);
if (totalAbonado > montoOriginal) {
throw new Error('los abonos no pueden superar el monto original');
}
const saldo = montoOriginal - totalAbonado;
const mora = calcularMora(saldo, diasVencidos);
return { saldo, mora, total: saldo + mora };
}

module.exports = { calcularMora, calcularSaldoConAbonos };
