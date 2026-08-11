```js
// --- S: Single Responsibility -- cada clase resuelve una sola cosa ---

class ValidadorStock {
  validar(items) {
    for (const item of items) {
      const stockActual = db.query("SELECT stock FROM productos WHERE id = ?", item.id);
      if (stockActual < item.cantidad) throw new Error("Sin stock para " + item.id);
    }
  }
}

class CalculadoraTotal {
  calcular(items) {
    const subtotal = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    const isv = subtotal * 0.15;
    return { subtotal, isv, total: subtotal + isv };
  }
}

class GeneradorTicket {
  generar(pedidoId, items, totales) {
    let ticket = "Pedido #" + pedidoId + "\n";
    for (const item of items) ticket += item.nombre + " x" + item.cantidad + "\n";
    ticket += "Subtotal: " + totales.subtotal + "\nISV: " + totales.isv + "\nTotal: " + totales.total;
    return ticket;
  }
}

// --- D: Dependency Inversion -- el guardado y el envio dependen de abstracciones ---

// Abstracciones (contratos)
class RepositorioPedidos {
  guardar(pedido) { throw new Error("no implementado"); }
}
class NotificadorCliente {
  notificar(cliente, mensaje) { throw new Error("no implementado"); }
}

// Implementaciones concretas (detalles de bajo nivel)
class RepositorioPedidosSQL extends RepositorioPedidos {
  guardar(pedido) { return db.insert("pedidos", pedido); }
}
class NotificadorWhatsApp extends NotificadorCliente {
  notificar(cliente, mensaje) { whatsappApi.send(cliente.telefono, mensaje); }
}

// --- Orquestador: recibe todo por constructor, no crea sus dependencias ---
class PedidoService {
  constructor(validador, calculadora, ticketGen, repositorio, notificador) {
    this.validador = validador;
    this.calculadora = calculadora;
    this.ticketGen = ticketGen;
    this.repositorio = repositorio;   // inyectado (abstraccion RepositorioPedidos)
    this.notificador = notificador;   // inyectado (abstraccion NotificadorCliente)
  }

  procesar(cliente, items) {
    this.validador.validar(items);
    const totales = this.calculadora.calcular(items);
    const pedidoId = this.repositorio.guardar({ cliente, items, ...totales });
    console.log(this.ticketGen.generar(pedidoId, items, totales));
    this.notificador.notificar(cliente, "Tu pedido #" + pedidoId + " fue procesado. Total: " + totales.total);
    return pedidoId;
  }
}

// Composicion (ej. en el punto de entrada de la app)
const service = new PedidoService(
  new ValidadorStock(),
  new CalculadoraTotal(),
  new GeneradorTicket(),
  new RepositorioPedidosSQL(),
  new NotificadorWhatsApp()
);
```
