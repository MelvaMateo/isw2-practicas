function procVta(items, cli, inv) {
    var t = 0;
    var d = 0;
    for (var i = 0; i < items.length; i++) {
          if (items[i].cant > 0) {
                  if (inv[items[i].id] >= items[i].cant) {
                            t = t + items[i].precio * items[i].cant;
                  } else {
                            return null;
                  }
          } else {
                  return null;
          }
    }
    if (t > 500) {
          d = t * 0.1;
    } else {
          d = 0;
    }
    var st = t - d;
    var imp = st * 0.15;
    var tot = st + imp;
    for (var j = 0; j < items.length; j++) {
          inv[items[j].id] = inv[items[j].id] - items[j].cant;
    }
    var r = "Cliente: " + cli + "\n";
    r = r + "Subtotal: " + t + "\n";
    r = r + "Descuento: " + d + "\n";
    r = r + "Impuesto: " + imp + "\n";
    r = r + "Total: " + tot + "\n";
    if (cli == "mayorista") {
          var t2 = 0;
          for (var k = 0; k < items.length; k++) {
                  t2 = t2 + items[k].precio * items[k].cant;
          }
          r = r + "Total mayorista: " + t2 + "\n";
    }
    return { total: tot, recibo: r };
}

module.exports = { procVta };
