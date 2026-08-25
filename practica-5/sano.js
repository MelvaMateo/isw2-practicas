const UMBRAL_DESCUENTO = 500;
const PORCENTAJE_DESCUENTO = 0.1;
const TASA_IMPUESTO = 0.15;

function validarDisponibilidad(items, inventario) {
            for (var idx = 0; idx < items.length; idx++) {
                          if (items[idx].cant <= 0) return false;
                          if (inventario[items[idx].id] < items[idx].cant) return false;
            }
            return true;
}

function calcularSubtotal(items) {
            var subtotal = 0;
            for (var idx = 0; idx < items.length; idx++) {
                          subtotal = subtotal + items[idx].precio * items[idx].cant;
            }
            return subtotal;
}

function calcularDescuento(subtotal) {
            return subtotal > UMBRAL_DESCUENTO ? subtotal * PORCENTAJE_DESCUENTO : 0;
}

function actualizarInventario(items, inventario) {
            for (var idx2 = 0; idx2 < items.length; idx2++) {
                          inventario[items[idx2].id] = inventario[items[idx2].id] - items[idx2].cant;
            }
}

function generarRecibo(cliente, subtotal, descuento, impuesto, total, items) {
            var recibo = "Cliente: " + cliente + "\n";
            recibo = recibo + "Subtotal: " + subtotal + "\n";
            recibo = recibo + "Descuento: " + descuento + "\n";
            recibo = recibo + "Impuesto: " + impuesto + "\n";
            recibo = recibo + "Total: " + total + "\n";
            if (cliente == "mayorista") {
                          recibo = recibo + "Total mayorista: " + calcularSubtotal(items) + "\n";
            }
            return recibo;
}

function registrarVenta(items, cliente, inventario) {
            if (!validarDisponibilidad(items, inventario)) return null;

  var subtotal = calcularSubtotal(items);
            var descuento = calcularDescuento(subtotal);
            var subtotalConDescuento = subtotal - descuento;
            var impuesto = subtotalConDescuento * TASA_IMPUESTO;
            var total = subtotalConDescuento + impuesto;

  actualizarInventario(items, inventario);

  var recibo = generarRecibo(cliente, subtotal, descuento, impuesto, total, items);
            return { total: total, recibo: recibo };
}

module.exports = { registrarVenta };
