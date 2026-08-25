function registrarVenta(items, cliente, inventario) {
    var subtotal = 0;
    var descuento = 0;
    for (var idx = 0; idx < items.length; idx++) {
          if (items[idx].cant > 0) {
                  if (inventario[items[idx].id] >= items[idx].cant) {
                            subtotal = subtotal + items[idx].precio * items[idx].cant;
                  } else {
                            return null;
                  }
          } else {
                  return null;
          }
    }
    if (subtotal > 500) {
          descuento = subtotal * 0.1;
    } else {
          descuento = 0;
    }
    var subtotalConDescuento = subtotal - descuento;
    var impuesto = subtotalConDescuento * 0.15;
    var total = subtotalConDescuento + impuesto;
    for (var idx2 = 0; idx2 < items.length; idx2++) {
          inventario[items[idx2].id] = inventario[items[idx2].id] - items[idx2].cant;
    }
    var recibo = "Cliente: " + cliente + "\n";
    recibo = recibo + "Subtotal: " + subtotal + "\n";
    recibo = recibo + "Descuento: " + descuento + "\n";
    recibo = recibo + "Impuesto: " + impuesto + "\n";
    recibo = recibo + "Total: " + total + "\n";
    if (cliente == "mayorista") {
          var totalMayorista = 0;
          for (var idx3 = 0; idx3 < items.length; idx3++) {
                  totalMayorista = totalMayorista + items[idx3].precio * items[idx3].cant;
          }
          recibo = recibo + "Total mayorista: " + totalMayorista + "\n";
    }
    return { total: total, recibo: recibo };
}

module.exports = { registrarVenta };
